import { axeCheck, createReport } from 'axe-testcafe';

fixture('NProgress')
  .page('../index.html');

test('it should pass accessibility test', async (t) => {
  const { violations } = await axeCheck(t);
  await t.expect(violations.length === 0).ok(createReport(violations));
});
