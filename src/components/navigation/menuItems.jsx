import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import {
  HomeOutlined,
  LayoutOutlined,
  FormOutlined,
  TableOutlined,
  VideoCameraOutlined,
  UnorderedListOutlined,
  CustomerServiceOutlined,
  RadarChartOutlined,
  ShoppingOutlined,
  BarChartOutlined,
  BgColorsOutlined,
  UserOutlined,
  NodeExpandOutlined,
} from '@ant-design/icons'
import { setSelectedTheme } from 'store/slices/themeSlice'

export const MenuItems = () => {
  const dispatch = useDispatch()

  const SiteLink = ({ page, title }) => <Link to={`/${page}`}>{title}</Link>

  return [
    {
      key: 'home',
      icon: <HomeOutlined />,
      label: <SiteLink page='home' title='Home' />,
    },
    {
      key: 'dashboard',
      icon: <LayoutOutlined />,
      label: <SiteLink page='dashboard' title='Dashboard' />,
    },
    {
      key: 'register',
      icon: <FormOutlined />,
      label: <SiteLink page='register' title='Register' />,
    },
    {
      key: 'grid',
      icon: <TableOutlined />,
      label: <SiteLink page='grid' title='Grid' />,
    },
    {
      key: 'video',
      icon: <VideoCameraOutlined />,
      label: <SiteLink page='video' title='Video' />,
    },
    {
      key: 'list',
      icon: <UnorderedListOutlined />,
      label: <SiteLink page='list' title='List' />,
    },
    {
      key: 'tree',
      icon: <NodeExpandOutlined />,
      label: <SiteLink page='tree' title='Tree' />,
    },
    {
      key: 'search/media',
      icon: <CustomerServiceOutlined />,
      label: <SiteLink page='search/media' title='Media' />,
    },
    {
      key: 'search/weather',
      icon: <RadarChartOutlined />,
      label: <SiteLink page='search/weather' title='Weather' />,
    },
    {
      key: 'shop',
      icon: <ShoppingOutlined />,
      label: <SiteLink page='shop' title='Shop' />,
    },
    {
      key: 'visuals',
      icon: <BarChartOutlined />,
      label: <SiteLink page='visuals' title='Visuals' />,
    },
    {
      key: 'bio',
      icon: <UserOutlined />,
      label: <SiteLink page='bio' title='Bio' />,
    },
    {
      key: 'theme',
      icon: <BgColorsOutlined />,
      label: <SiteLink page='theme' title='Theme' />,
      children: [
        {
          key: 'blue',
          label: 'Blue',
          onClick: () => dispatch(setSelectedTheme('default')),
        },
        {
          key: 'green',
          label: 'Green',
          onClick: () => dispatch(setSelectedTheme('green')),
        },
        {
          key: 'purple',
          label: 'Purple',
          onClick: () => dispatch(setSelectedTheme('purple')),
        },
      ],
    },
  ]
}
