import axe from 'axe-testcafe';

fixture('NProgress')
  .page('../index.html');

test('it should pass accessibility test', async (t) => {
  await axe(t);
});
