import React from 'react';
import moment from 'moment';

import {
  Page,
  Text,
  View,
  PDFViewer,
  Document,
  StyleSheet,
} from '@react-pdf/renderer';
import { useState } from 'react';

function IndexCard3by5({ tasks }) {
  console.log('tasks1', tasks);

  const [tasksForPrinting, setTasksForPrinting] = useState([
    {
      title: 'select one or more tasks for printing and click on the button',
      startDate: '',
      dueDate: '',
    },
  ]);

  function checkBoxPicks() {
    // const checkedItems = document.getElementsByClassName("printCheckbox");

    // let idsOfcheckedTasks = checkedItems
    //   .filter((task) => task.checked)
    //   .map((checkedTask) => checkedTask.id);
    // console.log("ids", idsOfcheckedTasks);

    let idsOfcheckedTasks = [];
    const checkChoices = document.getElementsByClassName('printCheckbox');
    console.log('checkChoices', checkChoices);
    for (let i in checkChoices) {
      idsOfcheckedTasks.push(
        checkChoices[i].checked ? checkChoices[i].id : null
      );
    }
    let onlyIDs = idsOfcheckedTasks.filter((id) => id !== null);
    console.log('onlyIDs', onlyIDs);
    console.log('tasks2', tasks);
    let theCheckedItems = onlyIDs
      .map((id) => tasks.filter((task) => task._id === id))
      .flat();
    console.log('checked', theCheckedItems);
    // setTasksForPrinting()
    //   setTasksForPrinting((tasksForPrinting) => [
    //     ...tasksForPrinting,
    //     theCheckedItems.map(item => {...item, title: item.title, startDate: item.startDate})
    //   ]);
    // }
    setTasksForPrinting(theCheckedItems);
  }

  const styles = StyleSheet.create({
    body: {
      fontsize: 12,
      color: 'grey',
    },
    label: {
      fontsize: 12,
    },
  });

  return (
    <div className='indexCard'>
      <PDFViewer showToolbar='true' width='500' height='400'>
        <Document>
          {tasksForPrinting.map((atask) => (
            <Page key={atask._id} size='A7' orientation='landscape'>
              <Text key={atask._id} style={styles.label}>
                Title:
                <Text key={atask._id} style={styles.body}>
                  {' ' + atask.title}
                </Text>
              </Text>
              <Text key={atask._id} style={styles.label}>
                Start date:
                <Text key={atask._id} style={styles.body}>
                  {' ' + atask.startDate}
                </Text>
              </Text>
              <Text key={atask._id} style={styles.label}>
                Due date:
                <Text key={atask._id} style={styles.body}>
                  {' ' + atask.dueDate}
                </Text>
              </Text>
              <Text key={atask._id} style={styles.label}>
                Creation date:
                <Text key={atask._id} style={styles.body}>
                  {' ' + moment(atask.createdAt).format('YYYY-MM-DD')}
                </Text>
              </Text>
            </Page>
          ))}
        </Document>
      </PDFViewer>
      <button type='button' className='button-print' onClick={checkBoxPicks}>
        Print selected tasks
      </button>
    </div>
  );
}

export default IndexCard3by5;
