export default class TodoItem {
    public message: string;
    public isComplete: boolean;

    constructor(message: string, isComplete: boolean) {
        this.message = message;
        this.isComplete = isComplete;
    }
  }
