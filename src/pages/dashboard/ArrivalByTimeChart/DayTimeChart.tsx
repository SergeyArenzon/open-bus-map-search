import React from 'react'
import { TEXTS } from 'src/resources/texts'
import { Skeleton, Radio, RadioChangeEvent } from 'antd'
import ArrivalByTimeChart from './ArrivalByTimeChart'
import { useDate } from 'src/pages/components/DateTimePicker'
import moment from 'moment'
import { GroupByRes, useGroupBy } from 'src/api/groupByService'

const convertToGraphCompatibleStruct = (arr: GroupByRes[]) => {
  return arr.map((item: GroupByRes) => ({
    id: item.operator_ref?.agency_id || 'Unknown',
    name: item.operator_ref?.agency_name || 'Unknown',
    current: item.total_actual_rides,
    max: item.total_planned_rides,
    percent: (item.total_actual_rides / item.total_planned_rides) * 100,
    gtfs_route_date: item.gtfs_route_date,
    gtfs_route_hour: item.gtfs_route_hour,
  }))
}
const now = moment()
const DayTimeChart = () => {
  const [startDate] = useDate(now.clone().subtract(7, 'days'))
  const [endDate] = useDate(now.clone().subtract(1, 'day'))
  const [groupByHour, setGroupByHour] = React.useState<boolean>(false)

  const [graphData, loadingGrap] = useGroupBy({
    dateTo: endDate,
    dateFrom: startDate,
    groupBy: groupByHour ? 'operator_ref,gtfs_route_hour' : 'operator_ref,gtfs_route_date',
  })

  return (
    <div className="widget">
      <h2 className="title">
        {groupByHour ? TEXTS.dashboard_page_graph_title_hour : TEXTS.dashboard_page_graph_title_day}
      </h2>
      <Radio.Group
        style={{ marginBottom: '10px' }}
        onChange={(e: RadioChangeEvent) => setGroupByHour(e.target.value === 'byHour')}
        defaultValue="byDay">
        <Radio.Button value="byDay">{TEXTS.group_by_day_tooltip_content}</Radio.Button>
        <Radio.Button value="byHour">{TEXTS.group_by_hour_tooltip_content}</Radio.Button>
      </Radio.Group>
      {loadingGrap ? (
        <Skeleton active />
      ) : (
        <ArrivalByTimeChart data={convertToGraphCompatibleStruct(graphData)} operatorId={''} />
      )}
    </div>
  )
}

export default DayTimeChart
