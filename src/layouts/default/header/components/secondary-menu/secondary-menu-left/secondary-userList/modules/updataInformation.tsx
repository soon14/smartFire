import { getRoleList } from '/@/api/sys/role';
import { getDeptListAll } from '/@/api/sys/dept';
import { uploadApi } from '/@/api/sys/upload';
import { divisionOptions } from '/@/utils/chinaDivision';
import { toRaw } from 'vue';
import { getJobList } from '/@/api/sys/job';
import { isEmpty, isUnDef } from '/@/utils/is';
import { dateUtil } from '/@/utils/dateUtil';
const eduMap = [
  { value: '1', label: '大专' },
  { value: '2', label: '本科' },
  { value: '3', label: '研究生' },
  { value: '4', label: '博士' },
  { value: '5', label: '其他' },
];
export function getUpdataInformationForm() {
  return [
    {
      field: 'account',
      component: 'Input',
      label: '账号',
      colProps: {
        span: 12,
      },
      rules: [{ required: true }],
    },
    {
      field: 'password',
      component: 'Input',
      label: '密码',
      colProps: {
        span: 12,
      },
      rules: [{ required: true }],
    },
    {
      field: 'roleId',
      component: 'ApiSelect',
      componentProps: {
        api: getRoleList,
        resultField: 'list',
        labelField: 'roleName',
        valueField: 'id',
        numberToString: true,
      },
      label: '所属角色',
      colProps: {
        span: 12,
      },
      rules: [{ required: true }],
    },
    {
      field: 'deptId',
      component: 'ApiTreeSelect',
      componentProps: {
        // xxxx props
        api: getDeptListAll,
        replaceFields: {
          label: 'deptName',
          value: 'id',
          children: 'deptVos',
        },
      },
      label: '部门',
      colProps: {
        span: 12,
      },
      rules: [
        {
          required: true,
          type: 'number',
          trigger: ['change', 'blur'],
        },
      ],
    },
    {
      field: 'personName',
      component: 'Input',
      label: '姓名',
      colProps: {
        span: 12,
      },
      rules: [{ required: true, whitespace: true }],
    },
    {
      field: 'signaturePath',
      component: 'Upload',
      componentProps: {
        api: uploadApi,
        maxNumber: 1,
        uploadParams: {
          data: {
            type: 1,
          },
        },
      },
      label: '添加电子签章',
      colProps: {
        span: 12,
      },
      rules: [{ required: true }],
    },
    {
      field: 'birth',
      component: 'DatePicker',
      componentProps: {
        style: {
          width: '100%',
        },
        // valueFormat: 'YYYY-MM-DD hh:mm:ss',
      },
      label: '生日',
      colProps: {
        span: 12,
      },
    },
    {
      field: 'reDivision',
      component: 'Cascader',
      componentProps: ({ formModel }) => {
        return {
          changeOnSelect: true,
          options: divisionOptions,
          onChange: (_, selectedOptions) => {
            formModel.registeredAddress = toRaw(selectedOptions)
              ?.map((item) => item.label)
              .join('');
          },
        };
      },
      label: '户口所在地',
      colProps: {
        span: 12,
      },
    },
    {
      field: 'registeredAddress',
      component: 'Input',
      label: '户口地址',
      colProps: {
        span: 12,
      },
      show: false,
    },
    {
      field: 'postId',
      component: 'ApiSelect',
      componentProps: {
        api: getJobList,
        resultField: 'list',
        labelField: 'postName',
        valueField: 'id',
        numberToString: true,
      },
      //
      label: '岗位',
      colProps: {
        span: 12,
      },
    },
    {
      field: 'nowDivision',
      component: 'Cascader',
      componentProps: ({ formModel }) => {
        return {
          changeOnSelect: true,
          options: divisionOptions,
          onChange: (_, selectedOptions) => {
            formModel.nowAddress = toRaw(selectedOptions)
              ?.map((item) => item.label)
              .join('');
          },
        };
      },
      label: '现居住地',
      colProps: {
        span: 12,
      },
    },
    {
      field: 'nowAddress',
      component: 'Input',
      label: '现住址',
      colProps: {
        span: 12,
      },
      show: false,
    },
    {
      field: 'idCard',
      component: 'Input',
      label: '身份证',
      colProps: {
        span: 12,
      },
      rules: [
        {
          type: 'number',
          validator: async (_, value) => {
            if (isUnDef(value) || isEmpty(value)) {
              return Promise.resolve();
            }
            const phoneReg =
              /^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/;
            if (!phoneReg.test(value)) {
              return Promise.reject('请输入正确格式身份证');
            }
            return Promise.resolve();
          },
          trigger: ['change', 'blur'],
        },
      ],
    },
    {
      field: 'eduBackground',
      component: 'Select',
      componentProps: {
        options: eduMap,
      },
      label: '学历',
      colProps: {
        span: 12,
      },
    },
    {
      field: 'detailedAddress',
      component: 'InputTextArea',
      label: '详细地址',
      colProps: {
        span: 12,
      },
    },
    {
      field: 'major',
      component: 'Select',
      componentProps: {
        options: [
          { value: '1', label: 'A1' },
          { value: '2', label: 'A2' },
          { value: '3', label: 'A3' },
          { value: '4', label: 'B1' },
          { value: '5', label: 'B2' },
          { value: '6', label: 'C1' },
          { value: '7', label: 'C2' },
          { value: '8', label: 'C3' },
          { value: '9', label: 'C4' },
          { value: '10', label: 'D' },
          { value: '11', label: 'E' },
          { value: '12', label: 'F' },
          { value: '13', label: 'M' },
          { value: '14', label: 'N' },
          { value: '15', label: 'P' },
        ],
      },
      label: '专业',
      colProps: {
        span: 12,
      },
    },
    {
      field: 'serviceTroops',
      component: 'Input',
      label: '服役部队',
      colProps: {
        span: 12,
      },
    },
    {
      field: 'enlistmentTime',
      component: 'DatePicker',
      componentProps: ({ formModel }) => {
        return {
          style: {
            width: '100%',
          },
          // valueFormat: 'YYYY-MM-DD hh:mm:ss',
          onChange: (e) => {
            const timeNow = dateUtil(dateUtil.now());
            const duration = dateUtil.duration(timeNow.diff(e));
            formModel.enlistmentYears = duration.years();
          },
        };
      },
      label: '入伍时间',
      colProps: {
        span: 12,
      },
    },
    {
      field: 'enlistmentYears',
      component: 'Input',
      componentProps: {
        disabled: true,
      },
      label: '入伍年限',
      colProps: {
        span: 12,
      },
    },
    {
      field: 'joinDate',
      component: 'DatePicker',
      componentProps: {
        style: {
          width: '100%',
        },
        // valueFormat: 'YYYY-MM-DD hh:mm:ss',
      },
      label: '入队时间',
      colProps: {
        span: 12,
      },
    },
    {
      field: 'contactPhone',
      component: 'Input',
      label: '联系电话',
      colProps: {
        span: 12,
      },
      rules: [
        {
          type: 'number',
          validator: async (_, value) => {
            if (isUnDef(value) || isEmpty(value)) {
              return Promise.resolve();
            }
            const phoneReg = /^[1][3,4,5,6,7,8,9][0-9]{9}$/;
            if (!phoneReg.test(value)) {
              return Promise.reject('请输入正确格式的手机号码');
            }
            return Promise.resolve();
          },
          trigger: ['change', 'blur'],
        },
      ],
    },
    {
      field: 'headPath',
      component: 'Upload',
      componentProps: {
        api: uploadApi,
        maxNumber: 1,
        uploadParams: {
          data: {
            type: 1,
          },
        },
      },
      label: '添加照片',
      colProps: {
        span: 12,
      },
    },
    {
      field: 'gender',
      component: 'RadioGroup',
      componentProps: {
        defaultValue: '1',
        options: [
          {
            label: '男',
            value: '1',
          },
          {
            label: '女',
            value: '2',
          },
        ],
      },
      label: '性别',
      colProps: {
        span: 12,
      },
    },
  ];
}
