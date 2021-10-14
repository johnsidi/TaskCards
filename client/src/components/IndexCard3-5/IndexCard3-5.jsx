import React from 'react';
import moment from 'moment';

import {
  Page,
  Text,
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
    // const checkChoices = document.getElementsByClassName('printCheckbox');
    // console.log('checkedItems', checkChoices);

    // let idsOfcheckedTasks = checkChoices
    //   .filter((task) => task.checked)
    //   .map((checkedTask) => checkedTask.id);
    // // console.log('ids', idsOfcheckedTasks);

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

    setTasksForPrinting(theCheckedItems);
  }

  const styles = StyleSheet.create({
    body: {
      fontsize: 12,
      color: 'grey',
      fontFamily: 'Helvetica',
      margin: 10,
      color: 'darkorange',
    },
    label: {
      fontsize: 10,
      margin: 10,
    },
  });

  return (
    <div className='indexCard'>
      <PDFViewer showToolbar='true' width='500' height='350'>
        <Document>
          {tasksForPrinting.map((atask) => (
            <Page
              style={{ justifyContent: 'space-between' }}
              key={atask._id}
              //a 3*5 index card in points
              size={[216, 360]}
              orientation='landscape'
            >
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
