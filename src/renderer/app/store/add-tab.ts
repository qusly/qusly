import store from './';

export class AddTabStore {
  public left = 0;

  public ref: HTMLDivElement;

  public setLeft(left: number, animation: boolean) {
    store.tabs.animateProperty('x', this.ref, left, animation);

    this.left = left;
  }

  public onClick = () => {
    const session = store.sessions.selected;

    if (session) {
      store.tabs.addTab({
        active: true,
        config: session.config,
      });
    }
  };
}
