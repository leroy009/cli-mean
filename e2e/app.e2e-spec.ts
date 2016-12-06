import { CliMeanPage } from './app.po';

describe('cli-mean App', function() {
  let page: CliMeanPage;

  beforeEach(() => {
    page = new CliMeanPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
