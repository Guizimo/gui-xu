import { View } from '@tarojs/components';
import './CategoryList.scss';
import { useEffect, useState } from 'react';
import { getCategoryList } from '../../../api/post';

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
    <View className="category-list-container">
      {categoryList.map((item: CategoryItem) => (
        <View
          className={`category-list-container-item ${activeCategory === item.id ? 'selected' : ''}`}
          key={item.id}
          onClick={() => onChange(item.id)}
        >
          {item.name}
        </View>
      ))}
    </View>
  );
};

export default CategoryList;
