import { dropRight, eachRight, takeRight, uniq } from "lodash";
import { questionApi } from "../api";

class BatchUpdater {
  private queue: string[] = [];
  private intervalRef!: ReturnType<typeof setInterval> | null;
  private updaterIdle: boolean = true;

  addChanges(changed: string[]) {
    const queue = [...changed, ...this.queue];
    this.queue = uniq(queue);
    if (!this.intervalRef) this.startTimer();
  }

  startTimer() {
    this.intervalRef = setInterval(() => {
      if (this.updaterIdle) this.syncChanges();
    }, 3000);
  }

  stopTimer() {
    if (this.intervalRef) {
      clearInterval(this.intervalRef);
      this.intervalRef = null;
    }
  }

  syncChanges() {
    const currentArr = takeRight(this.queue, 5);
    this.queue = dropRight(this.queue, 5);

    this.updaterIdle = false;
    const promises: Promise<any>[] = [];
    eachRight(currentArr, (id) => {
      promises.push(questionApi.update(id));
    });
    Promise.allSettled(promises).then(() => {
      this.updaterIdle = true;
    });

    if (this.queue.length === 0) this.stopTimer();
  }
}

export const batchUpdater = new BatchUpdater();
