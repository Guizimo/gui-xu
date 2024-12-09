import './post.scss';
import { Image, View } from '@tarojs/components';
import { useEffect, useState } from 'react';
import { getPostDetail } from '../../api/post';
import { getCurrentInstance } from '@tarojs/runtime';
import GlobalLoading from '../../components/GlobalLoading/GlobalLoading';
import { ConfigProvider } from '@nutui/nutui-react-taro';
import NavBar from '../../components/NavBar/NavBar';
import { generateRandomImgSrc, getDataInfo } from '../../utils/tools';
import { Comment, Date, Edit, Eye, People } from '@nutui/icons-react-taro';

interface Category {
  name: string,
  id: string
}

interface PostInfo {
  img: string; // 封面图
  title: string; // 标题
  author: string; // 作者
  visit: number; // 浏览量
  comment: number; // 评论数
  content: string; // 内容
  publishDate: string; // 发布日期
  excerpt: string; // 摘要
  lastModifyDate: string; // 最后修改日期
  categories: Category[] // 分类
}

const Post = () => {
  // 文章数据
  const [postInfo, setPostInfo] = useState<PostInfo | null>(null);
  // loading
  const [loading, setLoading] = useState<boolean>(true);

  const fetchData = async () => {
    setLoading(true);
    try {
      // 获取页面路由信息
      const router = getCurrentInstance().router;
      // 从 router 中解析参数
      const { id } = router?.params || {};
      const { spec, owner, categories, stats, status, content } = await getPostDetail(id);
      const temp: any = {}
      temp.title = spec?.title
      temp.img = spec?.cover || generateRandomImgSrc(spec?.title)
      temp.author = owner?.displayName
      temp.visit = stats?.visit
      temp.comment = stats?.comment
      temp.content = content?.raw
      temp.excerpt = spec?.excerpt?.raw
      temp.lastModifyDate = getDataInfo(status?.lastModifyTime)
      temp.publishDate = getDataInfo(status?.conditions?.find((item: any) => item.type === 'PUBLISHED')?.lastTransitionTime)
      temp.categories = categories?.map((item: any) => {
        return {
          name: item?.spec?.displayName,
          id: item?.metadata?.name
        }
      })
      setPostInfo(temp);
    } catch (e) {
      setPostInfo(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // 渲染Loading
  if (loading) {
    return <GlobalLoading visible={loading} />;
  }

  if (!postInfo) {
    return <View className="post-page">文章不存在</View>;
  }

  return (
    <ConfigProvider>
      <View className="post-page">
        <NavBar />
        <View className="post-head" >
          <Image className="post-img" src={postInfo.img} />
          <View className="post-info">
            <View className="post-info-category">
              {postInfo.categories?.map((category: Category) => <View className="post-info-category-item" key={category.id}>
                {category.name}
              </View>)}
            </View>
            <View className="post-info-title">{postInfo.title}</View>
            <View className="post-info-meta">
              <View className="post-info-meta-item">
                <People width="0.9rem" height="0.9rem" />
                <View className="post-info-meta-item-text">{postInfo.author}</View>
              </View>
              <View className="post-info-meta-item">
                <Eye width="0.9rem" height="0.9rem" />
                <View className="post-info-meta-item-text">{postInfo.visit}</View>
              </View>
              <View className="post-info-meta-item">
                <Comment width="0.9rem" height="0.9rem" />
                <View className="post-info-meta-item-text">{postInfo.comment}</View>
              </View>
              <View className="post-info-meta-item">
                <Date width="0.9rem" height="0.9rem" />
                <View className="post-info-meta-item-text">{postInfo.publishDate}</View>
              </View>
              <View className="post-info-meta-item">
                <Edit width="0.9rem" height="0.9rem" />
                <View className="post-info-meta-item-text">{postInfo.lastModifyDate}</View>
              </View>
            </View>
          </View>
        </View>
        <View className="post-content">
          <View className="post-content-excerpt">
            <View className="post-content-excerpt-title">AI摘要</View>
            <View className="post-content-excerpt-content">
              {postInfo.excerpt || 'AI偷懒了，没有摘要'}
            </View>
          </View>
          <View className="post-content-raw">
            <wemark md={postInfo.content} link highlight type='wemark' />
          </View>
        </View>
      </View>
    </ConfigProvider>
  );
};

export default Post;
