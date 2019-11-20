module.exports = {
  name: 'libertyware-form-builder',
  preset: '@libertyware/dev_kit_tools/jest.config.js',
  transform: {
    '^.+\\.[tj]sx?$': 'ts-jest'
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'html'],
  coverageDirectory: '../../../coverage/packages/dynamic-forms/form-builder'
};
