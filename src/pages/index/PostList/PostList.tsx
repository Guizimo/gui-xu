import { Image, View } from '@tarojs/components';
import './PostList.scss';
import { getPosts } from '../../../api/post';
import { useEffect, useState } from 'react';
import { generateRandomImgSrc, getDataInfo } from '../../../utils/tools';

interface PostListProps {
  activeCategory: string;
  gotoDetail: (id: string) => void;
}

interface CategoryItem {
  id: string;
  name: string;
}

interface PostItem {
  id: string;
  name: string;
  cover: string;
  publishTime: string;
  categoryList: CategoryItem[];
}

const PostList = (props: PostListProps) => {
  const { activeCategory, gotoDetail } = props;

  const [postList, setPostList] = useState<PostItem[]>([]);

  const fetchData = async () => {
    try {
      const { items } = await getPosts(activeCategory);
      const tempPostList: PostItem[] = items.map((item: any) => {
        return {
          id: item?.post?.spec?.headSnapshot,
          name: item?.post?.spec?.title,
          cover: item?.post?.spec?.cover || generateRandomImgSrc(item?.post?.spec?.title),
          publishTime: getDataInfo(item?.post?.spec?.publishTime),
          categoryList: item?.categories.map((category: { metadata: { name: any }; spec: { displayName: any } }) => {
            return {
              id: category?.metadata?.name,
              name: category?.spec?.displayName
            };
          })
        };
      });
      setPostList(tempPostList);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    if (activeCategory) {
      fetchData();
    }
  }, [activeCategory]);

  return (
    <View className="post-list-container">
      {postList.map((item) => (
        <View className="post-list-container-item" key={item.id} onClick={() => gotoDetail(item.id)}>
          <Image className="post-list-container-item-cover" lazyLoad src={item.cover}></Image>
          <View className="post-list-container-item-content">{item.name}</View>
          <View className="post-list-container-item-tooter">
            <View className="post-list-container-item-category">
              {item.categoryList.map((category) => (
                <View className="post-list-container-item-category-item" key={category.id}>
                  #{category.name}
                </View>
              ))}
            </View>
            <View className="post-list-container-item-publish-time">{item.publishTime}</View>
          </View>
        </View>
      ))}
    </View>
  );
};

export default PostList;
