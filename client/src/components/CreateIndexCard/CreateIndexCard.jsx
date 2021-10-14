import React from 'react';
import moment from 'moment';

import robotoFont from '../../assets/Roboto/Roboto-Light.ttf';
import robotoItalic from '../../assets/Roboto/Roboto-Italic.ttf';
import robotoBold from '../../assets/Roboto/Roboto-Bold.ttf';
import slimExtremeSingleLineFont from '../../assets/SlimExtreme/SlimExtreme.ttf';
import flamencoSingleLineFont from '../../assets/flamenco/Flamenco-Regular.ttf';

import {
  Page,
  Text,
  PDFViewer,
  Document,
  View,
  StyleSheet,
  Font,
} from '@react-pdf/renderer';

import { useState } from 'react';

function CreateIndexCard({ tasks, cardSize }) {
  console.log('cardSize', cardSize);
  let passedSize = null;
  // let passedSize = [216, 360];
  cardSize === 'A4' || cardSize === 'A7'
    ? (passedSize = cardSize)
    : (passedSize = cardSize.split(' '));
  console.log('passSize', passedSize);
  const [tasksForPrinting, setTasksForPrinting] = useState([
    {
      title:
        'select one or more tasks for printing and click on "Print Selected Tasks"',
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

  Font.register({
    family: 'SlimExtreme',
    fonts: [
      { src: slimExtremeSingleLineFont },
      { src: robotoItalic, fontStyle: 'italic' },
      { src: robotoBold, fontStyle: 'bold' },
    ],
  });

  const styles = StyleSheet.create({
    body: {
      fontFamily: 'SlimExtreme',
      fontSize: 16,
      fontStyle: 'normal',
      marginLeft: 30,
      marginRight: 10,
      marginTop: 10,
      color: 'black',
    },
    label: {
      fontFamily: 'SlimExtreme',
      fontSize: 16,
      fontStyle: 'normal',

      marginLeft: 50,
      marginRight: 10,
      marginTop: 20,
      marginBottom: 1,
      color: 'grey',
    },
  });

  return (
    <div className='indexCard'>
      <PDFViewer showToolbar='true' width='500' height='370'>
        <Document>
          {tasksForPrinting.map((atask) => (
            <Page
              style={{
                flexDirection: 'column',
                // justifyContent: 'start',
                // paddingVertical: '0px',
                // marginVertical: '0px',
              }}
              key={atask._id}
              //a 3*5 index card in points
              // size={[216, 360]}
              // size='A7' //better for printing
              // size={cardSize}
              size={passedSize}
              orientation='landscape'
            >
              <Text key={atask._id} style={styles.body}>
                {'Task: ' + atask.title + '\n\n'}
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
        Print Selected Tasks
      </button>
    </div>
  );
}

export default CreateIndexCard;
