/**
 * Bloom Filter implementation for username uniqueness checking
 * This provides probabilistic membership testing - it can tell us if a username
 * definitely doesn't exist, or if it might exist (requiring further verification)
 */

export class BloomFilter {
  private bitArray: boolean[];
  private size: number;
  private hashFunctions: number;

  constructor(expectedElements: number = 10000, falsePositiveRate: number = 0.01) {
    // Calculate optimal bit array size and number of hash functions
    this.size = Math.ceil((-expectedElements * Math.log(falsePositiveRate)) / (Math.log(2) ** 2));
    this.hashFunctions = Math.ceil((this.size / expectedElements) * Math.log(2));
    this.bitArray = new Array(this.size).fill(false);
  }

  /**
   * Hash function 1 - Simple string hashing
   */
  private hash1(str: string): number {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      const char = str.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash; // Convert to 32-bit integer
    }
    return Math.abs(hash) % this.size;
  }

  /**
   * Hash function 2 - FNV-1a hash variant
   */
  private hash2(str: string): number {
    let hash = 2166136261;
    for (let i = 0; i < str.length; i++) {
      hash = hash ^ str.charCodeAt(i);
      hash = hash * 16777619;
    }
    return Math.abs(hash) % this.size;
  }

  /**
   * Hash function 3 - djb2 hash
   */
  private hash3(str: string): number {
    let hash = 5381;
    for (let i = 0; i < str.length; i++) {
      hash = ((hash << 5) + hash) + str.charCodeAt(i);
    }
    return Math.abs(hash) % this.size;
  }

  /**
   * Get multiple hash values for a string
   */
  private getHashes(str: string): number[] {
    const hashes = [
      this.hash1(str.toLowerCase()),
      this.hash2(str.toLowerCase()),
      this.hash3(str.toLowerCase())
    ];

    // Generate additional hash functions if needed
    const baseHashes = hashes.slice();
    for (let i = 3; i < this.hashFunctions; i++) {
      const combinedHash = (baseHashes[0] + i * baseHashes[1] + i * i * baseHashes[2]) % this.size;
      hashes.push(Math.abs(combinedHash));
    }

    return hashes.slice(0, this.hashFunctions);
  }

  /**
   * Add a username to the bloom filter
   */
  add(username: string): void {
    const hashes = this.getHashes(username);
    hashes.forEach(hash => {
      this.bitArray[hash] = true;
    });
  }

  /**
   * Check if a username might exist
   * Returns false if username definitely doesn't exist
   * Returns true if username might exist (needs database verification)
   */
  mightExist(username: string): boolean {
    const hashes = this.getHashes(username);
    return hashes.every(hash => this.bitArray[hash]);
  }

  /**
   * Get the current false positive probability
   */
  getFalsePositiveProbability(): number {
    const setBits = this.bitArray.filter(bit => bit).length;
    const ratio = setBits / this.size;
    return Math.pow(ratio, this.hashFunctions);
  }

  /**
   * Export bloom filter state for persistence
   */
  export(): { bitArray: boolean[]; size: number; hashFunctions: number } {
    return {
      bitArray: [...this.bitArray],
      size: this.size,
      hashFunctions: this.hashFunctions
    };
  }

  /**
   * Import bloom filter state from persistence
   */
  import(data: { bitArray: boolean[]; size: number; hashFunctions: number }): void {
    this.bitArray = [...data.bitArray];
    this.size = data.size;
    this.hashFunctions = data.hashFunctions;
  }

  /**
   * Clear the bloom filter
   */
  clear(): void {
    this.bitArray.fill(false);
  }
}

/**
 * Singleton instance for username checking
 */
export const usernameBloomFilter = new BloomFilter(50000, 0.01); // Support 50k usernames with 1% false positive rate 