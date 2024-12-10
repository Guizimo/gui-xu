import { View } from '@tarojs/components';
import './CategoryList.scss';
import { useEffect, useState } from 'react';
import { getCategoryList } from '../../../api/post';
import useAppConfig from '../../../hooks/useAppConfig';

interface CategoryListProps {
  activeCategory: string; // 当前选中的分类
  onChange: (id: string) => void; // 分类切换回调
}

interface CategoryItem {
  id: string; // 分类id
  name: string; // 分类名称
}

const CategoryList = (props: CategoryListProps) => {
  const { onChange, activeCategory } = props;
  const [categoryList, setCategoryList] = useState<CategoryItem[]>([]);
  const { statusBarHeight, navBarHeight } = useAppConfig();
  const [navStyle, setNavStyle] = useState({});

  // 设置导航栏样式
  useEffect(() => {
    if (statusBarHeight) {
      setNavStyle({ top: `${statusBarHeight + navBarHeight}px` });
    }
  }, [statusBarHeight]);

  // 获取分类列表
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
            onChange(item.id);
          }}
        >
          {item.name}
        </View>
      ))}
    </View>
  );
};

export default CategoryList;
