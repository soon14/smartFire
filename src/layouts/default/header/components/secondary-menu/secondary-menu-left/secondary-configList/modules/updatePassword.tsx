export function getUpdatePasswordForm() {
  return [
    {
      field: 'password',
      component: 'Input',
      label: '请输入新密码',
      colProps: {
        span: 24,
      },
      rules: [{ required: true }],
    },
    {
      field: 'newPassword',
      component: 'Input',
      label: '请再次输入新密码',
      colProps: {
        span: 24,
      },
      rules: [{ required: true }],
    },
  ];
}
