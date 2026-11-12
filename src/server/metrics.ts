/**
 * Firestore Metrics and Circuit Breaker Tracking
 */

class FirestoreMetricsTracker {
  private circuitBreakerUntil = 0;
  private errors: Array<{ caller: string; collection: string; error: string; time: number }> = [];
  private reads: Array<{ caller: string; collection: string; type: string; count: number; isHit: boolean; time: number }> = [];

  setCircuitBreaker(until: number) {
    this.circuitBreakerUntil = until;
  }

  isCircuitBreakerActive(): boolean {
    return Date.now() < this.circuitBreakerUntil;
  }

  recordError(caller: string, collection: string, err: any) {
    this.errors.push({
      caller,
      collection,
      error: err?.message || String(err),
      time: Date.now(),
    });
    if (this.errors.length > 100) this.errors.shift();
  }

  recordRead(caller: string, collection: string, type: string, count: number, isHit: boolean) {
    this.reads.push({
      caller,
      collection,
      type,
      count,
      isHit,
      time: Date.now(),
    });
    if (this.reads.length > 200) this.reads.shift();
  }

  getSummary() {
    return {
      circuitBreakerActive: this.isCircuitBreakerActive(),
      circuitBreakerUntil: this.circuitBreakerUntil,
      recentErrors: this.errors.slice(-10),
      totalRecordedReads: this.reads.length,
    };
  }
}

export const firestoreMetrics = new FirestoreMetricsTracker();
