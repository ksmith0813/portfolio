import { Tabs, Col, Row } from 'antd'
import { useParams } from 'react-router-dom'
import { Movies } from './movies/movies'
import { Weather } from './weather/weather'

const { TabPane } = Tabs

export const Search = () => {
  let { page } = useParams()

  return (
    <div className='page justify-center'>
      <Col span={13}>
        <Row justify='center' className='fs-200 text-center'>
          Search for things
        </Row>
        <div className='pt-200'>
          <Tabs size='large' defaultActiveKey={page || 'movie'}>
            <TabPane tab='Media' key='movie'>
              <Movies />
            </TabPane>
            <TabPane tab='Weather' key='weather'>
              <Weather />
            </TabPane>
          </Tabs>
        </div>
      </Col>
    </div>
  )
}
