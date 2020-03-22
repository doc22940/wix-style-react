import transpileSRC from '../plugins/babel-plugin-src-to-es';

describe('babel-plugin-src-to-es', () => {
  it('should handle commonjs lib paths', async () => {
    const example = {
      api: {
        node: {
          source: {
            value: 'wix-ui-core/dist/src',
          },
        },
      },
      state: {
        opts: {
          esToSrc: false,
          libsName: ['wix-ui-core'],
        },
      },
    };

    expect(example.api.node.source.value).toBe('wix-ui-core/dist/src');
    const transpiler = transpileSRC();
    transpiler.visitor.ImportDeclaration(example.api, example.state);
    expect(example.api.node.source.value).toBe('wix-ui-core/dist/es/src');
  });

  it('should handle es lib paths', async () => {
    const example = {
      api: {
        node: {
          source: {
            value: 'wix-ui-core/dist/es/src',
          },
        },
      },
      state: {
        opts: {
          esToSrc: true,
          libsName: ['wix-ui-core'],
        },
      },
    };

    expect(example.api.node.source.value).toBe('wix-ui-core/dist/es/src');
    const transpiler = transpileSRC();
    transpiler.visitor.ImportDeclaration(example.api, example.state);
    expect(example.api.node.source.value).toBe('wix-ui-core/dist/src');
  });
});
