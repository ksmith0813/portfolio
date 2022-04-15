import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation } from 'react-router-dom'
import { Input } from 'antd'
import { getState, setSearch, setData, setSelectedItem, setSelectedItemByName } from 'store/slices/videoSlice'
import './video.scss'
import { NoData } from 'components/_siteWide/layout/layout'

export const Video = () => {
  const dispatch = useDispatch()
  const state = useSelector(getState)
  const selectedItem = state.selectedItem
  const hasCategories = state.search && state.categories.length > 0
  const search = useLocation().search
  const name = new URLSearchParams(search).get('name')

  useEffect(() => {
    dispatch(setData())
    name && dispatch(setSelectedItemByName(name))
  }, [dispatch, name])

  const onChange = (e) => {
    const value = e.target.value
    dispatch(setSearch(value || ''))
    dispatch(setData(value))
  }

  return (
    <div className='video-container'>
      <div className='video-menu'>
        <div className='video-search'>
          <Input value={state.search} onChange={onChange} placeholder='Search' autoFocus />
        </div>
        {hasCategories && <SearchCategories categories={state.categories} />}
        <VideoList data={state.data} selectedItem={selectedItem} hasCategories={hasCategories} dispatch={dispatch} />
      </div>
      {selectedItem && <SelectedVideoItem video={selectedItem} />}
      {!selectedItem && <NoSelectedItem />}
    </div>
  )
}

const SearchCategories = ({ categories }) => (
  <div className='search-categories'>
    <div className='pb-075'>
      <b>Categories</b>
    </div>
    <GroupTags values={categories.join(',')} />
  </div>
)

const VideoList = ({ data, selectedItem, hasCategories, dispatch }) => (
  <div className={`video-list ${hasCategories ? 'categories' : ''}`}>
    {data.map((d) => (
      <div
        key={d.id}
        onClick={() => dispatch(setSelectedItem(d))}
        className={`${selectedItem && selectedItem.id === d.id ? 'selected' : ''}`}
      >
        {d.name}
      </div>
    ))}
    {!data.length && <span className='flex p-100'>No matches found</span>}
  </div>
)

const SelectedVideoItem = ({ video }) => (
  <div className='selected-video-container'>
    <div>
      <video key={video.id} className={`${video.video?.is_flipped ? 'flipped' : ''}`} autoPlay>
        <source src={video.video?.url} />
        Your browser does not support the video tag.
      </video>
      <audio src={video.audio?.url} controls autoPlay />
    </div>
    <div className='pl-200'>
      <b>Name</b>
      <div className='fs-200 pb-100 medium-text'>{video.name}</div>
      <b>Description</b>
      <div className='video-description'>{video.description}</div>
      <div className='flex flex-row'>
        <DetailItem title='Muscle Groups' value={<GroupTags values={video.muscle_groups} />} />
        <DetailItem title='Equipment Req.' value={<GroupTags values={video.equipment_required} />} />
      </div>
      <div className='flex flex-row'>
        <DetailItem title='Movement Patterns' value={video.movement_patterns} />
        <DetailItem title='Synonyms' value={video.synonyms} />
      </div>
      <div className='flex flex-row'>
        <DetailItem title='Is Alternating' value={video.is_alternating ? 'Yes' : 'No'} />
        <DetailItem title='Side' value={video.side.replace('_', ' ') || 'N/A'} />
      </div>
    </div>
  </div>
)

const DetailItem = ({ title, value }) => (
  <div className='detail-item'>
    <b>{title}</b>
    <div>{value || 'N/A'}</div>
  </div>
)

const GroupTags = ({ values }) => {
  return values ? (
    <div className='group-tag-container'>
      {values &&
        values.split(',').map((m) => (
          <span key={m} className='group-tag'>
            {m}
          </span>
        ))}
    </div>
  ) : (
    <span>N/A</span>
  )
}

const NoSelectedItem = () => (
  <div className='flex-1 content-center fs-200'>
    <NoData message='Select an item for video details' />
  </div>
)
