import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation } from 'react-router-dom'
import { getState, setData, setSearch, setSelectedItem, setSelectedItemByName } from 'store/slices/menuSlice'
import './menu.scss'

export const Menu = () => {
  const state = useSelector(getState)
  const selectedItem = state.selectedItem
  const hasCategories = state.search && state.searchCategories.length > 0
  const dispatch = useDispatch()
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
    <div className='menu-container'>
      <div className='menu'>
        <div className='menu-search'>
          <input value={state.search} onChange={onChange} placeholder='Search' />
        </div>
        {hasCategories && <SearchCategories categories={state.searchCategories} />}
        <MenuList data={state.data} selectedItem={selectedItem} hasCategories={hasCategories} dispatch={dispatch} />
      </div>
      {selectedItem && <SelectedMenuItem item={selectedItem} />}
      {!selectedItem && <NoData />}
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

const MenuList = ({ data, selectedItem, hasCategories, dispatch }) => (
  <div className={`menu-list ${hasCategories ? 'categories' : ''}`}>
    {data.map((d) => (
      <div
        key={d.id}
        onClick={() => dispatch(setSelectedItem(d))}
        className={`${selectedItem && selectedItem.id === d.id ? 'selected' : ''}`}
      >
        {d.name}
      </div>
    ))}
  </div>
)

const SelectedMenuItem = ({ item }) => (
  <div className='selected-item-container'>
    <div>
      <video key={item.id} className={`${item.video?.is_flipped ? 'flipped' : ''}`} autoPlay>
        <source src={item.video?.url} />
        Your browser does not support the video tag.
      </video>
      <audio src={item.audio?.url} controls autoPlay />
    </div>
    <div className='pl-200'>
      <b>Name</b>
      <div className='fs-175 pb-100 medium-text'>{item.name}</div>
      <b>Description</b>
      <div className='item-description'>{item.description}</div>
      <div className='flex flex-row'>
        <DetailItem title='Muscle Groups' value={<GroupTags values={item.muscle_groups} />} />
        <DetailItem title='Equipment Req.' value={<GroupTags values={item.equipment_required} />} />
      </div>
      <div className='flex flex-row'>
        <DetailItem title='Movement Patterns' value={item.movement_patterns} />
        <DetailItem title='Synonyms' value={item.synonyms} />
      </div>
      <div className='flex flex-row'>
        <DetailItem title='Is Alternating' value={item.is_alternating ? 'Yes' : 'No'} />
        <DetailItem title='Side' value={item.side.replace('_', ' ') || 'N/A'} />
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

const NoData = () => <div className='page-center fs-200'>Select an exercise for workout details</div>
