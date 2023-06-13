import NextHead from 'next/head'

interface MetadataProps {
  title: string
  description: string
  image?: string
}

function Metadata({ title, image = '/logo.png' }: MetadataProps) {
  return (
    <NextHead>
      <title>{title}</title>
      <link rel="shortcut icon" href={image} type="image/x-icon" />
      <meta
        name="keywords"
        content="Thời trang hàng đầu,Thời trang đẳng cấp,Thời trang phong cách,Áo quần nam nữ,Bộ sưu tập mới,Phong cách độc đáo, localbrand,Localbrand,Beliy,Stress,StressWear, stresswear, beliyclothing, beliy stresswear,beliystresswear, beliy localbrand, beliy style "
      />
      <meta key="meta-title" name="title" content="Beliy StressWear - Thời trang hàng đầu" />
      <meta
        key="meta-description"
        name="description"
        content="Beliy StressWear là cửa hàng thời trang hàng đầu, mang đến cho bạn những mẫu thiết kế đẳng cấp với chất lượng cao và phong cách độc đáo."
      />

      <meta key="meta-og:type" property="og:type" content="website" />
      <meta
        key="meta-og:title"
        property="og:title"
        content="Beliy StressWear - Thời trang hàng đầu"
      />
      <meta
        key="meta-og:description"
        property="og:description"
        content="Beliy StressWear là cửa hàng thời trang hàng đầu, mang đến cho bạn những mẫu thiết kế đẳng cấp với chất lượng cao và phong cách độc đáo."
      />
      <meta key="meta-og:image" property="og:image" content="/path/to/og-image.jpg" />

      <meta key="meta-twitter:card" property="twitter:card" content="summary_large_image" />
      <meta
        key="meta-twitter:title"
        property="twitter:title"
        content="Beliy StressWear - Thời trang hàng đầu"
      />
      <meta
        key="meta-twitter:description"
        property="twitter:description"
        content="Beliy StressWear là cửa hàng thời trang hàng đầu, mang đến cho bạn những mẫu thiết kế đẳng cấp với chất lượng cao và phong cách độc đáo."
      />
      <meta
        key="meta-twitter:image"
        property="twitter:image"
        content="/path/to/twitter-image.jpg"
      />
    </NextHead>
  )
}

export default Metadata
