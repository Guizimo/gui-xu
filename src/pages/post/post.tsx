import './post.scss';
import { Image, View } from '@tarojs/components';
import { useEffect, useState } from 'react';
import { getPostDetail } from '../../api/post';
import { getCurrentInstance } from '@tarojs/runtime';
import { useShareAppMessage } from '@tarojs/taro';
import GlobalLoading from '../../components/GlobalLoading/GlobalLoading';
import { ConfigProvider } from '@nutui/nutui-react-taro';
import NavBar from '../../components/NavBar/NavBar';
import { generateRandomImgSrc, getDataInfo } from '../../utils/tools';
import { Comment, Date, Edit, Eye, Github, Link, People } from '@nutui/icons-react-taro';
import { useUserStore } from '../../stores';

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
  const { userinfo } = useUserStore();

  // 获取当前页面路由参数
  const router = getCurrentInstance().router;
  const postId = router?.params?.id;

  // 添加分享功能
  useShareAppMessage(() => {
    return {
      title: postInfo?.title || '精彩文章',
      path: `/pages/post/post?id=${postId}`,
      desc: postInfo?.excerpt,
      imageUrl: postInfo?.img
    };
  });

  const fetchData = async () => {
    setLoading(true);
    try {
      const { spec, owner, categories, stats, status, content } = await getPostDetail(postId);
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
          <View className="post-content-author">
            <Image className="post-content-author-img" src={userinfo?.basic?.logo} />
            <View className="post-content-author-name">{userinfo?.basic?.title}</View>
            <View className="post-content-author-desc">{userinfo?.themeTop?.above?.typed[0]?.text}</View>
            <View className="post-content-author-btn">
              <View className="post-content-author-btn-item">
                <Github />
              </View>
              <View className="post-content-author-btn-item">
                <Link />
              </View>
            </View>
          </View>
        </View>
      </View>
    </ConfigProvider>
  );
};

export default Post;
