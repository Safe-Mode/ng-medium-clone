import { Injectable } from '@angular/core';

@Injectable()
export class PersistenceService {

  set(key: string, data: unknown): void {
    try {
      localStorage.setItem(key, JSON.stringify(data));
    } catch (error) {
      console.warn('Localstorage saving error', error);
    }
  }

  get(key: string): unknown {
    try {
      return JSON.parse(localStorage.getItem(key) as string);
    } catch (error) {
      console.warn('Localstorage getting data error', error);
      return null;
    }
  }

}
