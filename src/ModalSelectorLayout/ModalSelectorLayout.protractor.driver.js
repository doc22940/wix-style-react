import {
  protractorUniTestkitFactoryCreator,
  protractorTestkitFactoryCreator,
} from 'wix-ui-test-utils/protractor';
import loaderDriverFactory from '../Loader/Loader.protractor.driver';
import textDriverFactory from '../Text/Text.protractor.driver';
import searchDriverFactory from '../Search/Search.protractor.driver';
import { dataHooks } from './ModalSelectorLayout.helpers';
import { buttonDriverFactory } from '../Button/Button.uni.driver';

const loaderTestkitFactory = protractorTestkitFactoryCreator(
  loaderDriverFactory,
);
const buttonTestkitFactory = protractorUniTestkitFactoryCreator(
  buttonDriverFactory,
);
const textTestkitFactory = protractorTestkitFactoryCreator(textDriverFactory);
const searchTestkitFactory = protractorTestkitFactoryCreator(
  searchDriverFactory,
);

const modalSelectorLayoutDriverFactory = component => {
  const findByDataHook = dataHook => component.$(`[data-hook="${dataHook}"]`);
  const findAllByDataHook = dataHook =>
    component.$$(`[data-hook="${dataHook}"]`);
  const mainLoaderDriver = () =>
    loaderTestkitFactory({ dataHook: dataHooks.mainLoader });
  const nextPageLoaderDriver = () =>
    loaderTestkitFactory({ dataHook: dataHooks.nextPageLoader });
  const cancelButtonDriver = () =>
    buttonTestkitFactory({ dataHook: 'cancellation-button' });
  const okButtonDriver = () =>
    buttonTestkitFactory({ dataHook: 'confirmation-button' });
  const subtitleTextDriver = () =>
    textTestkitFactory({ dataHook: dataHooks.subtitle });
  const searchDriver = () =>
    searchTestkitFactory({ dataHook: dataHooks.search });

  return {
    element: () => component,
    mainLoaderDriver,
    nextPageLoaderDriver,
    cancelButtonDriver,
    okButtonDriver,
    searchDriver,
    subtitleTextDriver,
    getTitle: () => findByDataHook('header-layout-title').getText(),
    clickOnClose: () => findByDataHook('header-close-button').click(),
    getEmptyState: () => findByDataHook(dataHooks.emptyState),
    getNoResultsFoundState: () => findByDataHook(dataHooks.noResultsFoundState),
    listExists: () => findByDataHook(dataHooks.list).isPresent(),
    numberOfItemsInList: () => findAllByDataHook(dataHooks.selector).count(),
  };
};

export default modalSelectorLayoutDriverFactory;
