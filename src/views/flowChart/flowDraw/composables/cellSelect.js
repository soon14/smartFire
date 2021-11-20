import { getCurrentInstance } from 'vue';

export default (graph, curCell) => {
  const instance = getCurrentInstance();
  console.log(instance);
  graph.value.on('cell:selected', ({ cell }) => {
    // instance.ctx.curCell = cell
    // instance.ctx.node = cell
    // console.log(instance.ctx.node);
    curCell.value = cell;
    let removeBtnCfg;
    let addBtnCfg;
    if (cell.isEdge()) {
      cell.attr('line', { stroke: 'skyblue', strokeWidth: 3 });
      removeBtnCfg = { distance: '30%' };
    }

    if (cell.isNode()) {
      const cellView = graph.value.findView(cell);
      cellView.addClass(`${cell.shape}-selected`);
      removeBtnCfg = { x: 0, y: 0, offset: { x: -5, y: -5 } };
      addBtnCfg = { x: 0, y: 0, offset: { x: 10, y: 10 } };
    }
    cell.addTools([
      {
        name: 'button', // 工具名称
        args: addBtnCfg, // 工具对应的参数
      },
      {
        name: 'button-remove', // 工具名称
        args: removeBtnCfg, // 工具对应的参数
      },
    ]);
  });

  graph.value.on('cell:unselected', ({ cell }) => {
    instance.ctx.curCell = null;
    if (cell.isEdge()) {
      cell.attr('line', { stroke: '#808080', strokeWidth: 1 });
    } else {
      const cellView = graph.value.findView(cell);
      cellView && cellView.removeClass(`${cell.shape}-selected`);
    }
    // cell.removeTools();
  });
};
