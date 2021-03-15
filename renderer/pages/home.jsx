import React from 'react';
import {
  CSSBaseline,
  ZEITUIProvider,
  Text,
  Row
} from '@zeit-ui/react'

import GoalList from '../components/GoalList';

import Head from 'next/head';
import Link from 'next/link';

const Next = () => {
  return (
    <ZEITUIProvider>
      <CSSBaseline />
      <Head>
        <title>OhMyGoal</title>
      </Head>
      <div className="p-lg">
        <Row justify="center" align="center">
          <Text h2>OhMyGoal</Text>
        </Row>
        <Row justify="center" align="center" style={{ marginBottom: '15px' }}>
        <Text small>Made with &hearts; by Indiealistic</Text>
        </Row>
        <div>
          <GoalList />
        </div>
        <style jsx global>
          {`

          *{
            box-sizing:border-box
          }

          .p-sm{
            padding:5px
          }

          .p-md{
            padding:10px
          }

          .p-lg{
            padding:15px
          }

        `}
        </style>
      </div>
    </ZEITUIProvider>
  );
};

export default Next;
