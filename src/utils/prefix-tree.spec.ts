import PrefixTree from './prefix-tree';

describe('PrefixTree', () => {
  let tree: PrefixTree;

  beforeAll(() => {
    tree = new PrefixTree([]);
    tree.insertWord('hello');
    tree.insertWord('hell');
    tree.insertWord('rain');
  });

  it('should insert word properly', () => {
    expect(tree.store).toEqual({
      children: {
        h: {
          children: {
            e: {
              children: {
                l: {
                  children: {
                    l: {
                      children: { o: { children: {}, isWord: true } },
                      isWord: true,
                    },
                  },
                },
              },
            },
          },
        },
        r: {
          children: {
            a: {
              children: {
                i: { children: { n: { children: {}, isWord: true } } },
              },
            },
          },
        },
      },
    });
  });

  it('should find word properly', () => {
    expect(tree.hasWord('hello')).toBe(true);
    expect(tree.hasWord('hell')).toBe(true);
    expect(tree.hasWord('rain')).toBe(true);
    expect(tree.hasWord('helll')).toBe(false);
    expect(tree.hasWord('helllo')).toBe(false);
    expect(tree.hasWord('ra')).toBe(false);
    expect(tree.hasWord('rai')).toBe(false);
    expect(tree.hasWord('rainn')).toBe(false);
  });
});
