import { Image, View } from '@tarojs/components';
import { navigateTo } from '@tarojs/taro';
import './PostList.scss';
import { getPosts } from '../../../api/post';
import { useEffect, useState } from 'react';
import { generateRandomImgSrc, getDataInfo } from '../../../utils/tools';
import GlobalLoading from '../../../components/GlobalLoading/GlobalLoading';
import useAppConfig from '../../../hooks/useAppConfig';
import useVibrationConfig from '../../../hooks/useVibrationConfig';

interface PostListProps {
  activeCategory: string;
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
  const { activeCategory } = props;
  const { statusBarHeight, screenHeight, navBarHeight } = useAppConfig();
  const { runVibrateShort } = useVibrationConfig();
  // 文章列表
  const [postList, setPostList] = useState<PostItem[]>([]);
  // loading
  const [loading, setLoading] = useState<boolean>(true);

  // 获取文章列表
  const fetchData = async () => {
    setLoading(true);
    try {
      const { items } = await getPosts(activeCategory);
      const tempPostList: PostItem[] = items.map((item: any) => {
        return {
          id: item?.post?.metadata?.name,
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
      setPostList([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (activeCategory) {
      fetchData();
    }
  }, [activeCategory]);

  // 跳转到详情页
  const gotoDetail = (id: string) => {
    runVibrateShort()
    navigateTo({
      url: `/pages/post/post?id=${id}`
    });
  };

  // 渲染Loading
  if (loading) {
    return <GlobalLoading visible={loading} />;
  }

  // 渲染列表
  return (
    <View
      className="post-list-container"
      style={{ minHeight: `${screenHeight - statusBarHeight - navBarHeight - 50}px` }}
    >
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
