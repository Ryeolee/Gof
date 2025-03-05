class Observer {
}
export class SaveCompleteObserver extends Observer {
    listeners = [];
    subscribe(v) {
        this.listeners.push(v);
    }
    unsubscrive(name) {
        this.listeners = this.listeners.filter((v) => v.name !== name);
    }
    publish() {
        this.listeners.forEach((target) => {
            target.publish("saveComplete");
        });
    }
}
