import React from 'react'
import {graphql} from 'gatsby'
import Layout from 'components/layout'

function MessagesPage() {
  return (
    <Layout>
      <div style={{padding: '40px 20px', textAlign: 'center', maxWidth: 600, margin: '0 auto'}}>
        <h1>Messages</h1>
        <p>This page has been simplified.</p>
      </div>
    </Layout>
  )
}

export default MessagesPage
