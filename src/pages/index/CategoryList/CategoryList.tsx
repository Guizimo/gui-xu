import { View } from '@tarojs/components';
import './CategoryList.scss';
import { useEffect, useState } from 'react';
import { getCategoryList } from '../../../api/post';
import useAppConfig from '../../../hooks/useAppConfig';
import useVibrationConfig from '../../../hooks/useVibrationConfig';

interface CategoryListProps {
  activeCategory: string;
  onChange: (id: string) => void;
}

interface CategoryItem {
  id: string;
  name: string;
}

const CategoryList = (props: CategoryListProps) => {
  const { onChange, activeCategory } = props;
  const [categoryList, setCategoryList] = useState<CategoryItem[]>([]);
  const { statusBarHeight, navBarHeight } = useAppConfig();
  const [navStyle, setNavStyle] = useState({});
  const { runVibrateShort } = useVibrationConfig();

  useEffect(() => {
    if (statusBarHeight) {
      setNavStyle({ top: `${statusBarHeight + navBarHeight}px` });
    }
  }, [statusBarHeight]);

  const fetchData = async () => {
    try {
      const { items } = await getCategoryList();
      const tempCategoryList: CategoryItem[] = items.map((item: any) => {
        return {
          id: item?.metadata?.name,
          name: item?.spec?.displayName
        };
      });
      tempCategoryList.unshift({ id: 'all', name: '全部' });
      setCategoryList(tempCategoryList);
    } catch (e) {}
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <View className="category-list-container" style={navStyle}>
      {categoryList.map((item: CategoryItem) => (
        <View
          className={`category-list-container-item ${activeCategory === item.id ? 'selected' : ''}`}
          key={item.id}
          onClick={() => {
            runVibrateShort();
            onChange(item.id)
          }}
        >
          {item.name}
        </View>
      ))}
    </View>
  );
};

export default CategoryList;
