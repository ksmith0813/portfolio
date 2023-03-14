import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation } from 'react-router-dom'
import { Input } from 'antd'
import { NoData } from 'components/_siteWide/layout/layout'
import { setSearch, setData, setSelectedItem, setSelectedItemByName } from 'store/slices/videoSlice'
import './video.scss'

export const Video = () => {
  const dispatch = useDispatch()
  const state = useSelector((state) => state.video)
  const data = state.data
  const search = data.search
  const selectedItem = state.selectedItem
  const categories = state.categories
  const hasCategories = state.search && categories.length > 0
  const locationSearch = useLocation().search
  const name = new URLSearchParams(locationSearch).get('name')

  useEffect(() => {
    dispatch(setData())
    name && dispatch(setSelectedItemByName(name))
  }, [dispatch, name])

  const onChange = (e) => {
    const value = e.target.value
    dispatch(setSearch(value || ''))
    dispatch(setData(value))
  }

  const SearchCategories = () => (
    <div className='search-categories'>
      <div className='pb-075'>
        <b>Categories</b>
      </div>
      <GroupTags values={categories.join(',')} />
    </div>
  )

  const VideoList = () => (
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

  const DetailItem = ({ title, value }) => (
    <div className='detail-item'>
      <b>{title}</b>
      <div className='light-text'>{value || 'N/A'}</div>
    </div>
  )

  const SelectedVideoItem = () => (
    <div className='selected-video-container'>
      <div>
        <video key={selectedItem.id} className={`${selectedItem.video?.is_flipped ? 'flipped' : ''}`} autoPlay>
          <source src={selectedItem.video?.url} />
          Your browser does not support the video tag.
        </video>
        <audio src={selectedItem.audio?.url} controls autoPlay />
      </div>
      <div className='pl-200'>
        <b>Name</b>
        <div className='fs-200 pb-100 medium-text'>{selectedItem.name}</div>
        <b>Description</b>
        <div className='video-description light-text'>{selectedItem.description}</div>
        <div className='flex flex-row'>
          <DetailItem title='Muscle Groups' value={<GroupTags values={selectedItem.muscle_groups} />} />
          <DetailItem title='Equipment Req.' value={<GroupTags values={selectedItem.equipment_required} />} />
        </div>
        <div className='flex flex-row'>
          <DetailItem title='Movement Patterns' value={selectedItem.movement_patterns} />
          <DetailItem title='Synonyms' value={selectedItem.synonyms} />
        </div>
        <div className='flex flex-row'>
          <DetailItem title='Is Alternating' value={selectedItem.is_alternating ? 'Yes' : 'No'} />
          <DetailItem title='Side' value={selectedItem.side.replace('_', ' ') || 'N/A'} />
        </div>
      </div>
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

  return (
    <div className='video-container'>
      <div className='video-menu'>
        <div className='video-search'>
          <Input value={search} onChange={onChange} placeholder='Search' autoFocus />
        </div>
        {hasCategories && <SearchCategories />}
        <VideoList />
      </div>
      {selectedItem && <SelectedVideoItem />}
      {!selectedItem && <NoSelectedItem />}
    </div>
  )
}
