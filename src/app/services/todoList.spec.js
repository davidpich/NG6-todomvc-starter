import TodoList from './todoList';

describe('TodoList service', () => {

  /** @type {TodoList} */
  var todos;

  beforeEach(() => {
    todos = new TodoList();
  });

  it('correctly handles stats', () => {
    const first = todos.add('test 1');

    expect(todos.notCompletedCount()).to.eq(1);
    expect(todos.completedCount()).to.eq(0);

    first.complete = true;

    expect(todos.notCompletedCount()).to.eq(0);
    expect(todos.completedCount()).to.eq(1);
  });

  describe('Filtering', () => {

    beforeEach(() => {
      const first = todos.add('test 1');
      first.complete = true;
      todos.add('test 2');
    });

    it('can show all tasks', () => {
      todos.showAll();
      expect(todos.filteredList.length).to.have.length.eq(2);
    });

    it('can show pending tasks', () => {
      todos.showActive();
      expect(todos.filteredList.length).to.have.length.eq(1);
    });

    it('can show completed tasks', () => {
      todos.showCompleted();
      expect(todos.filteredList.length).to.have.length.eq(1);
    });

  });

  describe('Toggle All', () => {
    let first, second;

    beforeEach(() => {
      first = todos.add('first');
      second = todos.add('second');
      second.complete = true;
    });

    it('makes all tasks complete if there is at least one incomplete task', () => {
      expect(todos.notCompletedCount()).to.eq(1);
      todos.toggleAll();
      expect(todos.notCompletedCount()).to.eq(0);
    });

    it('makes all tasks active if all tasks is complete', () => {
      first.complete = true;
      expect(todos.notCompletedCount()).to.eq(0);
      todos.toggleAll();
      expect(todos.notCompletedCount()).to.eq(2);
    });

  });

});