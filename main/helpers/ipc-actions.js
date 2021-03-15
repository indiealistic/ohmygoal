import * as Store from 'electron-store';
const store = new Store();
const key = 'goals';

if (!store.has(key)) {
  store.set(key, []);
}

export default function ipcActions(ipcMain) {
  ipcMain.on('fetchAllGoals', (event, arg) => {
    const goals = store.get('goals');
    event.sender.send('fetchAllGoalsResult', { data: goals });
  });

  ipcMain.on('addGoal', (event, arg) => {
    const goals = store.get('goals');
    goals.push({
      id: goals.length + 1,
      name: arg.name,
      targetValue: arg.value,
      currentValue: 0
    });
    store.set('goals', goals);
    event.sender.send('addGoalResult', { message: "Added" });
  });

  ipcMain.on('addAmount', (event, arg) => {
    const goals = store.get('goals');
    console.log({arg});
    const goalsWithAddedAmount = goals.filter(Boolean).map(item=>{
      if(item.id === arg.id){
      
        item.currentValue += parseInt(arg.value,10);
      }
      return item;
    });
    store.set('goals', goalsWithAddedAmount);
    event.sender.send('addAmountResult', { message: "Updated" });
  });

  ipcMain.on('deleteGoal', (event, arg) => {
    const goals = store.get('goals');
    let withoutDeletedGoal = goals.filter(Boolean).filter(item=>item.id !== arg.id);
    store.set('goals', withoutDeletedGoal);
    event.sender.send('deleteGoalResult', { message: "Deleted" });
  });
}