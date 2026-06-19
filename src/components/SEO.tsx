import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  type?: 'website' | 'article';
  publishedTime?: string;
  modifiedTime?: string;
  author?: string;
  noIndex?: boolean;
  category?: string;
}

const BASE_URL = 'https://e-seomax.com';

// Morocco cities for comprehensive local SEO targeting
const moroccanCities = [
  'Casablanca', 'Rabat', 'Marrakech', 'Tangier', 'Fes', 'Agadir',
  'Meknes', 'Oujda', 'Kenitra', 'Tetouan', 'Safi', 'El Jadida',
  'Nador', 'Mohammedia', 'Beni Mellal', 'Khouribga', 'Taza', 'Settat'
];

// Comprehensive Morocco-optimized SEO keywords (120+ keywords per language)
const defaultSEO = {
  en: {
    title: 'E-SEOMAX | #1 SEO Tool in Morocco – Free Audit',
    description: 'Welcome to E-SEOMAX, the undisputed leading AI-powered SEO platform and the absolute best comprehensive SEO tool available in Morocco. Our enterprise-level digital marketing solution is meticulously designed to help businesses across Casablanca, Rabat, Marrakech, Tangier, Fes, Agadir, and every other Moroccan city completely dominate search engine results pages. We provide an exceptionally thorough, free website audit that meticulously analyzes your technical SEO, on-page optimization, backlink profile, and mobile responsiveness. By leveraging cutting-edge artificial intelligence, our advanced SEO algorithms identify critical ranking opportunities, fix detrimental technical errors, and optimize your content to drastically boost your Google rankings, drive massive organic traffic, and significantly increase your online visibility and revenue.',
    keywords: [
      // Core SEO keywords
      'SEO Morocco', 'SEO tool Morocco', 'website analysis Morocco', 'free SEO audit Morocco',
      'best SEO tool Morocco', 'SEO agency Morocco', 'SEO platform Morocco', 'SEO software Morocco',
      'website optimization Morocco', 'search engine optimization Morocco', 'SEO services Morocco',
      'digital marketing Morocco', 'online marketing Morocco', 'web marketing Morocco',
      'SEO audit tool', 'keyword research Morocco', 'backlink analysis Morocco',
      'technical SEO Morocco', 'on-page SEO Morocco', 'off-page SEO Morocco',
      'local SEO Morocco', 'mobile SEO Morocco', 'SEO ranking Morocco',
      'Google ranking Morocco', 'SERP analysis Morocco', 'competitor analysis Morocco',
      'content optimization Morocco', 'SEO consulting Morocco', 'SEO expert Morocco',
      
      // City-specific SEO keywords
      ...moroccanCities.map(city => `SEO ${city}`),
      ...moroccanCities.map(city => `website optimization ${city}`),
      'SEO agency Casablanca', 'SEO expert Rabat', 'SEO consultant Marrakech',
      'digital marketing Casablanca', 'web agency Rabat', 'marketing agency Tangier',
      
      // Industry variations
      'e-commerce SEO Morocco', 'hotel SEO Morocco', 'restaurant SEO Morocco',
      'real estate SEO Morocco', 'healthcare SEO Morocco', 'law firm SEO Morocco',
      'startup SEO Morocco', 'small business SEO Morocco', 'enterprise SEO Morocco',
      
      // Multilingual markers
      'تحسين محركات البحث المغرب', 'référencement Maroc', 'SEO Maroc',
      'audit SEO gratuit', 'analyse site web', 'optimisation site web'
    ].join(', '),
  },
  fr: {
    title: 'E-SEOMAX | Outil SEO #1 au Maroc – Audit Gratuit',
    description: 'Bienvenue sur E-SEOMAX, la plateforme SEO propulsée par l\'intelligence artificielle la plus performante et le meilleur outil de référencement naturel disponible au Maroc. Notre solution de marketing digital de niveau entreprise est méticuleusement conçue pour aider les entreprises de Casablanca, Rabat, Marrakech, Tanger, Fès, Agadir et de toutes les autres villes marocaines à dominer complètement les résultats des moteurs de recherche. Nous fournissons un audit gratuit de site web exceptionnellement détaillé qui analyse minutieusement votre SEO technique, l\'optimisation on-page, les backlinks et la compatibilité mobile. Grâce à l\'intelligence artificielle de pointe, nos algorithmes SEO avancés identifient les opportunités de classement critiques, corrigent les erreurs techniques et optimisent votre contenu pour améliorer considérablement vos classements Google, générer un trafic organique massif et augmenter significativement votre visibilité en ligne et vos revenus.',
    keywords: [
      // Core French SEO keywords
      'SEO Maroc', 'outil SEO Maroc', 'analyse site web Maroc', 'audit SEO gratuit Maroc',
      'meilleur outil SEO Maroc', 'agence SEO Maroc', 'plateforme SEO Maroc',
      'référencement naturel Maroc', 'référencement web Maroc', 'optimisation SEO Maroc',
      'optimisation site web Maroc', 'positionnement Google Maroc', 'services SEO Maroc',
      'marketing digital Maroc', 'marketing en ligne Maroc', 'stratégie SEO Maroc',
      'audit référencement Maroc', 'recherche mots-clés Maroc', 'analyse backlinks Maroc',
      'SEO technique Maroc', 'SEO on-page Maroc', 'SEO off-page Maroc',
      'SEO local Maroc', 'SEO mobile Maroc', 'classement SEO Maroc',
      'positionnement web Maroc', 'analyse SERP Maroc', 'analyse concurrentielle Maroc',
      'optimisation contenu Maroc', 'consultant SEO Maroc', 'expert SEO Maroc',
      
      // City-specific French keywords
      'SEO Casablanca', 'SEO Rabat', 'SEO Marrakech', 'SEO Tanger', 'SEO Fès',
      'SEO Agadir', 'SEO Meknès', 'SEO Oujda', 'SEO Kénitra', 'SEO Tétouan',
      'référencement Casablanca', 'référencement Rabat', 'référencement Marrakech',
      'agence web Casablanca', 'agence digitale Rabat', 'marketing digital Casablanca',
      'expert SEO Casablanca', 'consultant SEO Rabat', 'audit SEO Marrakech',
      'optimisation site Casablanca', 'positionnement Google Rabat',
      
      // Industry variations French
      'SEO e-commerce Maroc', 'SEO hôtel Maroc', 'SEO restaurant Maroc',
      'SEO immobilier Maroc', 'SEO santé Maroc', 'SEO avocat Maroc',
      'SEO startup Maroc', 'SEO PME Maroc', 'SEO entreprise Maroc',
      
      // Additional French terms
      'webmarketing Maroc', 'netlinking Maroc', 'rédaction web SEO Maroc',
      'formation SEO Maroc', 'cours SEO Maroc', 'apprendre SEO Maroc'
    ].join(', '),
  },
  ar: {
    title: 'E-SEOMAX | أداة SEO رقم 1 في المغرب – تدقيق مجاني',
    description: 'مرحباً بكم في E-SEOMAX، منصة تحسين محركات البحث الرائدة عالمياً والمدعومة بالذكاء الاصطناعي، وأفضل أداة شاملة متوفرة في المغرب لتحسين السيو. تم تصميم حل التسويق الرقمي الخاص بنا على مستوى المؤسسات بدقة لمساعدة الشركات في الدار البيضاء، الرباط، مراكش، طنجة، فاس، أكادير، وجميع المدن المغربية الأخرى على السيطرة التامة على صفحات نتائج محركات البحث. نحن نقدم تدقيقاً مجانياً وشاملاً للمواقع الإلكترونية يحلل بدقة السيو التقني، وتحسين الصفحات الداخلية، وملف الروابط الخلفية، وتوافق الموقع مع الأجهزة المحمولة. من خلال الاستفادة من الذكاء الاصطناعي المتطور، تحدد خوارزميات السيو المتقدمة لدينا فرص التصدر الحاسمة، وتصلح الأخطاء التقنية الضارة، وتحسن المحتوى الخاص بك لتعزيز ترتيبك على جوجل بشكل كبير، ودفع حركة مرور عضوية ضخمة، وزيادة ظهورك على الإنترنت وإيراداتك بشكل كبير.',
    keywords: [
      // Core Arabic SEO keywords
      'تحسين محركات البحث المغرب', 'SEO المغرب', 'تحليل المواقع المغرب', 'تدقيق SEO مجاني المغرب',
      'أفضل أداة SEO المغرب', 'وكالة SEO المغرب', 'منصة SEO المغرب', 'برنامج SEO المغرب',
      'تحسين المواقع المغرب', 'تحسين محركات البحث', 'خدمات SEO المغرب',
      'التسويق الرقمي المغرب', 'التسويق الإلكتروني المغرب', 'التسويق عبر الإنترنت المغرب',
      'أداة تدقيق SEO', 'بحث الكلمات المفتاحية المغرب', 'تحليل الروابط الخلفية المغرب',
      'SEO التقني المغرب', 'تحسين الصفحات المغرب', 'بناء الروابط المغرب',
      'SEO المحلي المغرب', 'SEO الجوال المغرب', 'ترتيب SEO المغرب',
      'ترتيب جوجل المغرب', 'تحليل نتائج البحث المغرب', 'تحليل المنافسين المغرب',
      'تحسين المحتوى المغرب', 'استشارات SEO المغرب', 'خبير SEO المغرب',
      
      // City-specific Arabic keywords
      'SEO الدار البيضاء', 'SEO الرباط', 'SEO مراكش', 'SEO طنجة', 'SEO فاس',
      'SEO أكادير', 'SEO مكناس', 'SEO وجدة', 'SEO القنيطرة', 'SEO تطوان',
      'تحسين محركات البحث الدار البيضاء', 'تحسين محركات البحث الرباط', 'تحسين محركات البحث مراكش',
      'وكالة رقمية الدار البيضاء', 'وكالة تسويق الرباط', 'خبير SEO الدار البيضاء',
      'تدقيق SEO مراكش', 'تحليل الموقع طنجة', 'تحسين الموقع فاس',
      
      // Industry variations Arabic
      'SEO التجارة الإلكترونية المغرب', 'SEO الفنادق المغرب', 'SEO المطاعم المغرب',
      'SEO العقارات المغرب', 'SEO الرعاية الصحية المغرب', 'SEO المحاماة المغرب',
      'SEO الشركات الناشئة المغرب', 'SEO الشركات الصغيرة المغرب',
      
      // Additional Arabic terms
      'تصدر نتائج البحث', 'رفع ترتيب الموقع', 'زيادة زيارات الموقع',
      'تحسين ظهور الموقع', 'الظهور في جوجل', 'أرشفة المواقع المغرب'
    ].join(', '),
  },
};

// Page-specific SEO configurations with enhanced descriptions
const pageSEO: Record<string, { en: Partial<SEOProps>; fr: Partial<SEOProps>; ar: Partial<SEOProps> }> = {
  '/': {
    en: { 
      title: 'E-SEOMAX | #1 SEO Tool in Morocco – Free Audit',
      description: 'Welcome to E-SEOMAX, the absolute best AI-powered SEO platform in Morocco. Enhance your digital marketing strategy and dominate search engines with our enterprise-grade comprehensive website audits, specialized keyword research tools, and detailed competitor analysis. Whether you are in Casablanca, Rabat, Marrakech, Tangier, or Fes, our sophisticated system offers unparalleled on-page and technical SEO insights specifically tailored for your business. We empower organizations of all sizes to radically boost organic traffic, climb higher on Google rankings, and convert casual visitors into immensely loyal customers through data-driven decisions and state-of-the-art search engine optimization technology. Discover the difference today and experience phenomenal growth.',
    },
    fr: { 
      title: 'E-SEOMAX | Outil SEO #1 au Maroc – Audit Gratuit',
      description: 'Bienvenue sur E-SEOMAX, la meilleure plateforme SEO propulsée par l\'intelligence artificielle au Maroc. Améliorez votre stratégie de marketing digital et dominez les moteurs de recherche grâce à nos audits de sites web complets de niveau entreprise, nos outils spécialisés de recherche de mots-clés et notre analyse détaillée de la concurrence. Que vous soyez à Casablanca, Rabat, Marrakech, Tanger ou Fès, notre système sophistiqué offre des informations SEO techniques et on-page inégalées, spécifiquement adaptées à votre entreprise. Nous permettons aux organisations de toutes tailles de stimuler radicalement le trafic organique, de grimper dans les classements Google et de convertir les visiteurs occasionnels en clients extrêmement fidèles grâce à des décisions basées sur les données et à une technologie d\'optimisation pour les moteurs de recherche de pointe. Découvrez la différence aujourd\'hui.',
    },
    ar: { 
      title: 'E-SEOMAX | أداة SEO رقم 1 في المغرب – تدقيق مجاني',
      description: 'مرحباً بك في E-SEOMAX، أفضل منصة لتحسين محركات البحث مدعومة بالذكاء الاصطناعي في المغرب. عزز استراتيجية التسويق الرقمي الخاصة بك وسيطر على محركات البحث من خلال تدقيق المواقع الشامل على مستوى المؤسسات، وأدوات البحث المتخصصة عن الكلمات الرئيسية، والتحليل التفصيلي للمنافسين. سواء كنت في الدار البيضاء أو الرباط أو مراكش أو طنجة أو فاس، فإن نظامنا المتطور يقدم رؤى فنية وصفحية لا مثيل لها ومصممة خصيصاً لعملك. نحن نمكن المؤسسات من جميع الأحجام من تعزيز حركة المرور العضوية بشكل جذري، وتسلق مراتب أعلى في تصنيفات جوجل، وتحويل الزوار العاديين إلى عملاء مخلصين للغاية من خلال قرارات تعتمد على البيانات وأحدث تقنيات تحسين محركات البحث. اكتشف الفرق اليوم.',
    },
  },
  '/about': {
    en: { 
      title: 'About E-SEOMAX | AI-Powered SEO Platform Morocco',
      description: 'Learn comprehensively about E-SEOMAX, the indisputable premier AI-powered SEO platform meticulously engineered for the Moroccan market. Discover our passionate team of highly experienced digital marketing experts and technical innovators dedicated to revolutionizing how businesses in Casablanca, Rabat, Marrakech, Tangier, Agadir, and beyond achieve ultimate online success. Our enterprise-level mission is to empower organizations with the most sophisticated, intuitive, and remarkably effective search engine optimization tools available anywhere, ensuring maximum visibility and substantial sustainable growth. We combine cutting-edge artificial intelligence, unparalleled local market knowledge, and absolute commitment to excellence to deliver an exceptional platform that consistently drives superior ranking results and unprecedented return on investment for our clients.',
    },
    fr: { 
      title: 'À Propos E-SEOMAX | Plateforme SEO IA Maroc',
      description: 'Découvrez en détail E-SEOMAX, la première plateforme SEO propulsée par l\'IA, méticuleusement conçue pour le marché marocain. Rencontrez notre équipe passionnée d\'experts en marketing digital hautement expérimentés et d\'innovateurs techniques dédiés à révolutionner la façon dont les entreprises de Casablanca, Rabat, Marrakech, Tanger, Agadir et au-delà atteignent le succès ultime en ligne. Notre mission à l\'échelle de l\'entreprise est de donner aux organisations les moyens d\'utiliser les outils d\'optimisation pour les moteurs de recherche les plus sophistiqués, intuitifs et remarquablement efficaces disponibles, garantissant une visibilité maximale et une croissance durable substantielle. Nous combinons l\'intelligence artificielle de pointe, une connaissance inégalée du marché local et un engagement absolu envers l\'excellence pour fournir une plateforme exceptionnelle.',
    },
    ar: { 
      title: 'حول E-SEOMAX | منصة SEO بالذكاء الاصطناعي المغرب',
      description: 'تعرف بشكل شامل على E-SEOMAX، منصة تحسين محركات البحث الأولى بلا منازع والمدعومة بالذكاء الاصطناعي، والمصممة بدقة لتناسب السوق المغربي. اكتشف فريقنا الشغوف من خبراء التسويق الرقمي ذوي الخبرة العالية والمبتكرين التقنيين المكرسين لإحداث ثورة في كيفية تحقيق الشركات في الدار البيضاء، الرباط، مراكش، طنجة، أكادير وما وراءها للنجاح المطلق عبر الإنترنت. مهمتنا على مستوى المؤسسات هي تمكين المنظمات من استخدام أدوات تحسين محركات البحث الأكثر تطوراً وبديهية وفعالية ملحوظة المتاحة في أي مكان، مما يضمن أقصى قدر من الرؤية ونمواً مستداماً كبيراً. نحن نجمع بين الذكاء الاصطناعي المتطور والمعرفة التي لا مثيل لها بالسوق المحلي والالتزام المطلق بالتميز لتقديم منصة استثنائية تؤدي باستمرار إلى نتائج تصنيف فائقة.',
    },
  },
  '/blog': {
    en: { 
      title: 'SEO Blog Morocco | Tips & Guides | E-SEOMAX',
      description: 'Explore the highly authoritative E-SEOMAX blog for absolutely essential expert SEO tips, extraordinarily comprehensive guides, and profound industry insights uniquely tailored for the dynamic Moroccan digital landscape. Dive deep into incredibly advanced search engine optimization strategies specially formulated for businesses striving to completely dominate local markets in Casablanca, Rabat, Marrakech, Tangier, and Fes. Updated relentlessly with the most current SEO trends, algorithmic changes, and technical innovations, our enterprise-level content provides actionable, highly sophisticated advice to significantly increase your organic rankings, dramatically enhance website performance, and successfully implement world-class digital marketing campaigns that generate explosive growth and massive measurable returns on your marketing investments.',
    },
    fr: { 
      title: 'Blog SEO Maroc | Conseils & Guides | E-SEOMAX',
      description: 'Explorez le blog très réputé d\'E-SEOMAX pour des conseils SEO d\'experts absolument essentiels, des guides extraordinairement complets et des informations approfondies sur l\'industrie, spécialement adaptés au paysage numérique marocain dynamique. Plongez au cœur des stratégies d\'optimisation pour les moteurs de recherche incroyablement avancées, spécialement conçues pour les entreprises qui s\'efforcent de dominer complètement les marchés locaux à Casablanca, Rabat, Marrakech, Tanger et Fès. Mis à jour sans relâche avec les tendances SEO les plus actuelles, les changements d\'algorithmes et les innovations techniques, notre contenu de niveau entreprise fournit des conseils hautement sophistiqués et applicables pour augmenter considérablement vos classements organiques, améliorer de manière spectaculaire les performances de votre site web et mettre en œuvre avec succès des campagnes de marketing digital de classe mondiale.',
    },
    ar: { 
      title: 'مدونة SEO المغرب | نصائح وإرشادات | E-SEOMAX',
      description: 'استكشف مدونة E-SEOMAX الموثوقة للغاية للحصول على نصائح السيو الضرورية من الخبراء، والأدلة الشاملة بشكل استثنائي، والرؤى العميقة للصناعة والمصممة خصيصاً للمشهد الرقمي المغربي الديناميكي. تعمق في استراتيجيات تحسين محركات البحث المتقدمة بشكل لا يصدق والمصممة خصيصاً للشركات التي تسعى للسيطرة التامة على الأسواق المحلية في الدار البيضاء، الرباط، مراكش، طنجة، وفاس. يتم تحديث محتوانا على مستوى المؤسسات بلا هوادة بأحدث اتجاهات السيو، وتغييرات الخوارزميات، والابتكارات التقنية، ويقدم نصائح قابلة للتنفيذ ومتطورة للغاية لزيادة تصنيفاتك العضوية بشكل كبير، وتعزيز أداء موقع الويب بشكل كبير، وتنفيذ حملات تسويق رقمي عالمية المستوى بنجاح تولد نمواً هائلاً وعوائد ضخمة قابلة للقياس على استثماراتك التسويقية.',
    },
  },
  '/contact': {
    en: { 
      title: 'Contact E-SEOMAX | SEO Support Morocco',
      description: 'Get in touch with the highly responsive E-SEOMAX team to secure absolutely superior, enterprise-level SEO support across the entirety of Morocco. Whether your business operates dynamically in Casablanca, Rabat, Marrakech, Tangier, Fes, Agadir, or any other region, our exceptionally dedicated experts are fully prepared to meticulously assist you with advanced platform utilization, deeply comprehensive website audits, and sophisticated technical troubleshooting. Do not hesitate to confidently reach out with incredibly complex digital marketing inquiries, potential lucrative partnership opportunities, or technical challenges—we are passionately committed to ensuring your total absolute satisfaction and propelling your website to the tremendously lucrative first position on global search engines.',
    },
    fr: { 
      title: 'Contactez E-SEOMAX | Support SEO Maroc',
      description: 'Entrez en contact avec l\'équipe très réactive d\'E-SEOMAX pour obtenir un support SEO absolument supérieur, de niveau entreprise, dans tout le Maroc. Que votre entreprise opère de manière dynamique à Casablanca, Rabat, Marrakech, Tanger, Fès, Agadir ou toute autre région, nos experts exceptionnellement dévoués sont pleinement préparés à vous assister méticuleusement dans l\'utilisation avancée de la plateforme, les audits de sites web extrêmement complets et le dépannage technique sophistiqué. N\'hésitez pas à nous contacter en toute confiance pour des questions de marketing digital incroyablement complexes, des opportunités de partenariats lucratifs potentiels ou des défis techniques — nous sommes passionnément engagés à garantir votre satisfaction absolue totale et à propulser votre site web vers la première position extrêmement lucrative sur les moteurs de recherche mondiaux.',
    },
    ar: { 
      title: 'اتصل بـ E-SEOMAX | دعم SEO المغرب',
      description: 'تواصل مع فريق E-SEOMAX سريع الاستجابة للحصول على دعم سيو متفوق تماماً وعلى مستوى المؤسسات في جميع أنحاء المغرب. سواء كانت شركتك تعمل بنشاط في الدار البيضاء، الرباط، مراكش، طنجة، فاس، أكادير، أو أي منطقة أخرى، فإن خبرائنا المتفانين بشكل استثنائي مستعدون تماماً لمساعدتك بدقة في الاستخدام المتقدم للمنصة، وعمليات تدقيق المواقع الشاملة بعمق، واستكشاف الأخطاء التقنية المعقدة وإصلاحها. لا تتردد في التواصل بثقة بشأن الاستفسارات المتعلقة بالتسويق الرقمي المعقدة بشكل لا يصدق، أو فرص الشراكة المربحة المحتملة، أو التحديات الفنية — نحن ملتزمون بشغف بضمان رضاك المطلق التام ودفع موقع الويب الخاص بك إلى المركز الأول المربح للغاية على محركات البحث العالمية.',
    },
  },
  '/faq': {
    en: { 
      title: 'SEO FAQ Morocco | Questions Answered | E-SEOMAX',
      description: 'Browse our incredibly extensive and intensely detailed Frequently Asked Questions section to uncover authoritative, enterprise-grade answers regarding cutting-edge SEO strategies seamlessly applicable in Morocco. Gain profound, highly technical insights into exceptionally sophisticated website optimization methodologies critical for achieving overwhelming success in tremendously competitive markets such as Casablanca, Rabat, Marrakech, and Tangier. We comprehensively address incredibly complex queries about algorithmic updates, extremely advanced backlink construction techniques, highly effective local SEO domination strategies, and exactly how the powerfully innovative E-SEOMAX artificial intelligence precisely analyzes digital footprints to undeniably secure the coveted number one ranking position on major search engine results effectively and consistently.',
    },
    fr: { 
      title: 'FAQ SEO Maroc | Questions Fréquentes | E-SEOMAX',
      description: 'Parcourez notre section de questions fréquemment posées, incroyablement vaste et intensément détaillée, pour découvrir des réponses faisant autorité et de niveau entreprise concernant les stratégies SEO de pointe parfaitement applicables au Maroc. Obtenez des informations profondes et hautement techniques sur les méthodologies d\'optimisation de sites web exceptionnellement sophistiquées, essentielles pour obtenir un succès écrasant sur des marchés extrêmement concurrentiels tels que Casablanca, Rabat, Marrakech et Tanger. Nous abordons de manière exhaustive des questions incroyablement complexes sur les mises à jour algorithmiques, les techniques de construction de backlinks extrêmement avancées, les stratégies de domination SEO locales très efficaces, et exactement comment l\'intelligence artificielle puissamment innovante d\'E-SEOMAX analyse avec précision les empreintes numériques pour sécuriser indéniablement la position de numéro un tant convoitée sur les principaux résultats des moteurs de recherche de manière efficace et cohérente.',
    },
    ar: { 
      title: 'الأسئلة الشائعة SEO المغرب | E-SEOMAX',
      description: 'تصفح قسم الأسئلة الشائعة الواسع والمفصل بشكل لا يصدق لاكتشاف إجابات موثوقة وعلى مستوى المؤسسات فيما يتعلق باستراتيجيات تحسين محركات البحث المتطورة والقابلة للتطبيق بسلاسة في المغرب. احصل على رؤى عميقة وتقنية للغاية حول منهجيات تحسين مواقع الويب المتطورة بشكل استثنائي والتي تعد حاسمة لتحقيق نجاح ساحق في الأسواق شديدة التنافسية مثل الدار البيضاء والرباط ومراكش وطنجة. نحن نعالج بشكل شامل الاستفسارات المعقدة بشكل لا يصدق حول تحديثات الخوارزميات، وتقنيات بناء الروابط الخلفية المتقدمة للغاية، واستراتيجيات السيطرة على السيو المحلي الفعالة للغاية، وبالتحديد كيف يحلل الذكاء الاصطناعي المبتكر بقوة من E-SEOMAX البصمات الرقمية بدقة لتأمين المركز الأول المنشود بلا شك في نتائج محركات البحث الرئيسية بفعالية وباستمرار.',
    },
  },
  '/how-it-works': {
    en: { 
      title: 'How E-SEOMAX Works | SEO Analysis Morocco',
      description: 'Discover profoundly exactly how E-SEOMAX utilizes magnificently advanced artificial intelligence and extraordinarily sophisticated crawling technologies to meticulously perform unbelievably comprehensive SEO analysis specifically exclusively engineered for the rapidly evolving Moroccan digital ecosystem. Gain an incredibly deep, enterprise-level understanding of our remarkably powerful proprietary algorithms that flawlessly dissect website architectures, evaluate on-page optimization with surgical precision, and rapidly identify highly lucrative ranking opportunities for ambitious businesses fiercely competing in vibrant locations such as Casablanca, Rabat, Marrakech, and Tangier. Completely dominate your competition and relentlessly secure the absolute first position on search engines by brilliantly leveraging our completely free, exhaustively detailed, and supremely actionable website technical audits.',
    },
    fr: { 
      title: 'Comment Fonctionne E-SEOMAX | Analyse SEO Maroc',
      description: 'Découvrez profondément exactement comment E-SEOMAX utilise une intelligence artificielle magnifiquement avancée et des technologies d\'exploration extraordinairement sophistiquées pour effectuer méticuleusement une analyse SEO incroyablement complète spécifiquement et exclusivement conçue pour l\'écosystème numérique marocain en évolution rapide. Acquérez une compréhension incroyablement profonde, de niveau entreprise, de nos algorithmes propriétaires remarquablement puissants qui dissèquent parfaitement les architectures de sites web, évaluent l\'optimisation on-page avec une précision chirurgicalale, et identifient rapidement des opportunités de classement très lucratives pour les entreprises ambitieuses en concurrence féroce dans des endroits dynamiques tels que Casablanca, Rabat, Marrakech et Tanger. Dominez complètement vos concurrents et sécurisez sans relâche la position de leader absolu sur les moteurs de recherche en tirant brillamment parti de nos audits techniques de sites web entièrement gratuits, exhaustivement détaillés et suprêmement exploitables.',
    },
    ar: { 
      title: 'كيف يعمل E-SEOMAX | تحليل SEO المغرب',
      description: 'اكتشف بعمق كيف تستخدم E-SEOMAX بالضبط الذكاء الاصطناعي المتقدم بشكل رائع وتقنيات الزحف المتطورة بشكل استثنائي لإجراء تحليل سيو شامل لا يصدق بدقة ومصمم خصيصاً وحصرياً للنظام البيئي الرقمي المغربي سريع التطور. اكتسب فهماً عميقاً بشكل لا يصدق، على مستوى المؤسسات، لخوارزمياتنا الخاصة القوية بشكل ملحوظ والتي تشرح معماريات مواقع الويب بشكل لا تشوبه شائبة، وتقيم تحسين الصفحات الداخلية بدقة جراحية، وتحدد بسرعة فرص التصدر المربحة للغاية للشركات الطموحة التي تتنافس بشراسة في مواقع نابضة بالحياة مثل الدار البيضاء والرباط ومراكش وطنجة. سيطر تماماً على منافسيك وقم بتأمين المركز الأول المطلق بلا هوادة على محركات البحث من خلال الاستفادة ببراعة من عمليات التدقيق الفنية المجانية تماماً والمفصلة بشكل شامل والقابلة للتنفيذ بشكل فائق لمواقع الويب.',
    },
  },
  '/privacy-policy': {
    en: { title: 'Privacy Policy | E-SEOMAX Morocco', description: 'At E-SEOMAX, the absolutely leading, enterprise-level AI-powered SEO platform unequivocally dedicated to serving businesses across the entirety of Morocco including major digital hubs like Casablanca, Rabat, Marrakech, Tangier, and Fes, we tremendously value and ferociously protect your personal digital privacy. This extraordinarily detailed privacy policy meticulously delineates exactly how we securely collect, extensively use, appropriately disclose, and comprehensively safeguard your highly sensitive data when you actively utilize our spectacularly advanced search engine optimization tools and comprehensive website auditing services. We are completely committed to maintaining the highest possible international standards of data protection, ensuring your absolute confidence while you decisively dominate Google rankings and aggressively scale your online presence and digital marketing campaigns.', noIndex: false },
    fr: { title: 'Politique de Confidentialité | E-SEOMAX Maroc', description: 'Chez E-SEOMAX, la plateforme SEO de niveau entreprise propulsée par l\'IA, absolument leader et sans équivoque dédiée au service des entreprises dans tout le Maroc, y compris les grands pôles numériques comme Casablanca, Rabat, Marrakech, Tanger et Fès, nous valorisons énormément et protégeons farouchement votre confidentialité numérique personnelle. Cette politique de confidentialité extraordinairement détaillée délimite méticuleusement exactement comment nous collectons en toute sécurité, utilisons de manière approfondie, divulguons de manière appropriée et sauvegardons de manière exhaustive vos données très sensibles lorsque vous utilisez activement nos outils d\'optimisation pour les moteurs de recherche de pointe de manière spectaculaire et nos services d\'audit de site web complets. Nous sommes totalement engagés à maintenir les normes internationales les plus élevées possibles en matière de protection des données, garantissant votre confiance absolue pendant que vous dominez de manière décisive les classements Google et que vous développez agressivement votre présence en ligne et vos campagnes de marketing digital.', noIndex: false },
    ar: { title: 'سياسة الخصوصية | E-SEOMAX المغرب', description: 'في E-SEOMAX، منصة السيو الرائدة والمزودة بالذكاء الاصطناعي على مستوى المؤسسات والمخصصة بشكل لا لبس فيه لخدمة الشركات في جميع أنحاء المغرب بما في ذلك المحاور الرقمية الرئيسية مثل الدار البيضاء والرباط ومراكش وطنجة وفاس، نحن نقدر بشكل كبير ونحمي خصوصيتك الرقمية الشخصية بشراسة. توضح سياسة الخصوصية المفصلة هذه بشكل غير عادي بدقة كيف نقوم بجمع بياناتك الحساسة للغاية بأمان، واستخدامها على نطاق واسع، والإفصاح عنها بشكل مناسب، وحمايتها بشكل شامل عندما تستخدم بنشاط أدوات تحسين محركات البحث المتقدمة بشكل مذهل وخدمات تدقيق المواقع الشاملة. نحن ملتزمون تماماً بالحفاظ على أعلى المعايير الدولية الممكنة لحماية البيانات، مما يضمن ثقتك المطلقة بينما تسيطر بشكل حاسم على تصنيفات جوجل وتقوم بتوسيع نطاق تواجدك عبر الإنترنت وحملات التسويق الرقمي الخاصة بك بقوة.', noIndex: false },
  },
  '/terms-of-service': {
    en: { title: 'Terms of Service | E-SEOMAX Morocco', description: 'Carefully review the incredibly comprehensive, enterprise-grade Terms of Service critically governing your extensive use of E-SEOMAX, undeniably Morocco\'s premier, most advanced AI-powered SEO optimization platform heavily utilized by industry-leading businesses traversing Casablanca, Rabat, Marrakech, Tangier, and Fes. These meticulously formulated terms explicitly define your significant legal rights, crucial responsibilities, and the absolute conditions under which you may effectively access our tremendously powerful free SEO audits, highly sophisticated keyword tracking mechanisms, and immensely detailed competitor analysis frameworks. By consistently utilizing our spectacularly effective digital marketing services aimed at permanently securing the absolute number one ranking on Google, you explicitly agree to rigidly adhere to these exceptionally important stipulations thoroughly designed to ensure a secure, mutually beneficial, and astonishingly productive environment.', noIndex: false },
    fr: { title: 'Conditions d\'Utilisation | E-SEOMAX Maroc', description: 'Examinez attentivement les conditions d\'utilisation incroyablement complètes et de niveau entreprise qui régissent de manière critique votre utilisation intensive d\'E-SEOMAX, indéniablement la première plateforme d\'optimisation SEO propulsée par l\'IA au Maroc, très utilisée par les entreprises leaders du secteur traversant Casablanca, Rabat, Marrakech, Tanger et Fès. Ces conditions méticuleusement formulées définissent explicitement vos droits légaux importants, vos responsabilités cruciales et les conditions absolues dans lesquelles vous pouvez accéder efficacement à nos audits SEO gratuits extrêmement puissants, à nos mécanismes de suivi des mots clés hautement sophistiqués et à nos cadres d\'analyse de la concurrence immensément détaillés. En utilisant systématiquement nos services de marketing digital spectaculairement efficaces visant à sécuriser de manière permanente la position de numéro un absolu sur Google, vous acceptez explicitement d\'adhérer rigoureusement à ces stipulations exceptionnellement importantes conçues pour garantir un environnement sécurisé, mutuellement bénéfique et étonnamment productif.', noIndex: false },
    ar: { title: 'شروط الخدمة | E-SEOMAX المغرب', description: 'راجع بعناية شروط الخدمة الشاملة بشكل لا يصدق وعلى مستوى المؤسسات التي تحكم بشكل حاسم استخدامك المكثف لـ E-SEOMAX، بلا شك منصة تحسين محركات البحث الأولى والأكثر تقدماً والمدعومة بالذكاء الاصطناعي في المغرب والتي تستخدمها بشكل كبير الشركات الرائدة في الصناعة التي تعبر الدار البيضاء والرباط ومراكش وطنجة وفاس. تحدد هذه الشروط المصاغة بدقة صراحة حقوقك القانونية الهامة ومسؤولياتك الحاسمة والشروط المطلقة التي يمكنك بموجبها الوصول بفعالية إلى تدقيقات السيو المجانية القوية للغاية وآليات تتبع الكلمات الرئيسية المتطورة للغاية وأطر تحليل المنافسين المفصلة بشكل كبير. من خلال الاستخدام المستمر لخدمات التسويق الرقمي الفعالة بشكل مذهل والتي تهدف إلى تأمين المركز الأول المطلق على جوجل بشكل دائم، فإنك توافق صراحة على الالتزام بصرامة بهذه الشروط المهمة بشكل استثنائي والمصممة لضمان بيئة آمنة ومفيدة للطرفين ومنتجة بشكل مذهل.', noIndex: false },
  },
  '/cookie-policy': {
    en: { title: 'Cookie Policy | E-SEOMAX Morocco', description: 'Extensively explore the profoundly detailed E-SEOMAX Cookie Policy to perfectly understand precisely how our incredibly advanced, enterprise-tier SEO platform strategically employs highly sophisticated digital cookies and associated tracking technologies to dramatically enhance your overall website experience. Our revolutionary digital marketing tool, proudly serving the most demanding clients in Casablanca, Rabat, Marrakech, Tangier, and comprehensively throughout Morocco, transparently uses these extremely vital data elements to optimize remarkable platform functionality, execute extraordinarily deep SEO audits, and provide intensely personalized content recommendations specifically engineered to forcefully propel your website to the absolutely dominant first page of highly competitive Google search results, thereby securing monumental online visibility.', noIndex: false },
    fr: { title: 'Politique des Cookies | E-SEOMAX Maroc', description: 'Explorez de manière approfondie la politique des cookies profondément détaillée d\'E-SEOMAX pour comprendre parfaitement et précisément comment notre plateforme SEO incroyablement avancée de niveau entreprise utilise de manière stratégique des cookies numériques hautement sophistiqués et des technologies de suivi associées pour améliorer considérablement votre expérience globale sur le site web. Notre outil de marketing digital révolutionnaire, au service des clients les plus exigeants de Casablanca, Rabat, Marrakech, Tanger, et de manière exhaustive dans tout le Maroc, utilise de manière transparente ces éléments de données extrêmement vitaux pour optimiser les fonctionnalités remarquables de la plateforme, exécuter des audits SEO extraordinairement approfondis et fournir des recommandations de contenu intensément personnalisées spécifiquement conçues pour propulser avec force votre site web vers la première page absolument dominante des résultats de recherche Google hautement concurrentiels, assurant ainsi une visibilité en ligne monumentale.', noIndex: false },
    ar: { title: 'سياسة ملفات تعريف الارتباط | E-SEOMAX المغرب', description: 'استكشف على نطاق واسع سياسة ملفات تعريف الارتباط E-SEOMAX المفصلة بعمق لفهم كيف تستخدم منصة السيو المتقدمة بشكل لا يصدق وعلى مستوى المؤسسات استراتيجياً ملفات تعريف الارتباط الرقمية المتطورة للغاية وتقنيات التتبع المرتبطة بها لتعزيز تجربة موقع الويب العام الخاص بك بشكل كبير. تستخدم أداة التسويق الرقمي الثورية الخاصة بنا، والتي تخدم بكل فخر العملاء الأكثر تطلباً في الدار البيضاء، الرباط، مراكش، طنجة، وبشكل شامل في جميع أنحاء المغرب، عناصر البيانات الحيوية للغاية هذه بشفافية لتحسين وظائف المنصة الرائعة، وتنفيذ عمليات تدقيق سيو عميقة بشكل غير عادي، وتقديم توصيات محتوى مخصصة بشكل مكثف ومصممة خصيصاً لدفع موقع الويب الخاص بك بقوة إلى الصفحة الأولى المهيمنة تماماً في نتائج بحث جوجل شديدة التنافسية، وبالتالي تأمين رؤية هائلة عبر الإنترنت.', noIndex: false },
  },
  '/disclaimer': {
    en: { title: 'Disclaimer | E-SEOMAX Morocco', description: 'Intensively peruse the extraordinarily comprehensive E-SEOMAX legal disclaimer, which meticulously clarifies the absolute boundaries, profound limitations of liability, and remarkably critical enterprise-level conditions explicitly related to your extensive usage of Morocco\'s undisputed premier AI-powered SEO platform. While our unbelievably powerful optimization tools and immensely detailed digital marketing insights are exquisitely designed to phenomenally assist businesses across Casablanca, Rabat, Marrakech, and Tangier to relentlessly achieve the highly coveted number one ranking on incredibly competitive search engines, this overwhelmingly detailed document rigorously explains that actual digital performance outcomes can dramatically vary based on an enormous multitude of highly complex, dynamically shifting algorithmic and market-specific factors absolutely beyond our direct technological control.', noIndex: false },
    fr: { title: 'Avertissement | E-SEOMAX Maroc', description: 'Parcourez intensément l\'avertissement légal extraordinairement complet d\'E-SEOMAX, qui clarifie méticuleusement les limites absolues, les profondes limitations de responsabilité et les conditions de niveau entreprise remarquablement critiques explicitement liées à votre utilisation intensive de la première plateforme SEO propulsée par l\'IA incontestée au Maroc. Bien que nos outils d\'optimisation incroyablement puissants et nos informations de marketing digital immensément détaillées soient excellemment conçus pour aider de manière phénoménale les entreprises à travers Casablanca, Rabat, Marrakech et Tanger à atteindre sans relâche la position de numéro un très convoitée sur des moteurs de recherche incroyablement compétitifs, ce document extrêmement détaillé explique rigoureusement que les résultats de performance numérique réels peuvent varier considérablement en fonction d\'une énorme multitude de facteurs algorithmiques et spécifiques au marché hautement complexes et en évolution dynamique, qui échappent absolument à notre contrôle technologique direct.', noIndex: false },
    ar: { title: 'إخلاء المسؤولية | E-SEOMAX المغرب', description: 'اقرأ بتمعن إخلاء المسؤولية القانوني الشامل بشكل استثنائي لـ E-SEOMAX، والذي يوضح بدقة الحدود المطلقة، والقيود العميقة للمسؤولية، وشروط مستوى المؤسسة الحاسمة بشكل ملحوظ والمربوطة صراحة باستخدامك المكثف لمنصة السيو الأولى التي لا جدال فيها والمدعومة بالذكاء الاصطناعي في المغرب. في حين أن أدوات التحسين القوية بشكل لا يصدق ورؤى التسويق الرقمي المفصلة بشكل كبير مصممة بشكل رائع لمساعدة الشركات بشكل استثنائي في الدار البيضاء، الرباط، مراكش، وطنجة على تحقيق المركز الأول المنشود بشدة وبلا هوادة على محركات البحث التنافسية بشكل لا يصدق، يوضح هذا المستند المفصل بشكل ساحق بصرامة أن نتائج الأداء الرقمي الفعلي يمكن أن تختلف بشكل كبير بناءً على مجموعة هائلة من العوامل الخوارزمية الخاصة بالسوق المعقدة للغاية والمتغيرة ديناميكياً والتي تخرج تماماً عن سيطرتنا التكنولوجية المباشرة.', noIndex: false },
  },
};

const SEO = ({ 
  title, 
  description, 
  keywords, 
  image = 'https://e-seomax.com/og-image.png',
  type = 'website',
  publishedTime,
  modifiedTime,
  author = 'E-SEOMAX',
  noIndex = false,
  category,
}: SEOProps) => {
  const location = useLocation();
  const { i18n } = useTranslation();
  const lang = i18n.language?.split('-')[0] || 'en';
  const langKey = (lang === 'fr' ? 'fr' : lang === 'ar' ? 'ar' : 'en') as keyof typeof defaultSEO;
  
  const currentPath = location.pathname;
  const pageConfig = pageSEO[currentPath]?.[langKey] || {};
  
  const finalTitle = title || pageConfig.title || defaultSEO[langKey].title;
  const finalDescription = description || pageConfig.description || defaultSEO[langKey].description;
  const finalKeywords = keywords || defaultSEO[langKey].keywords;
  const shouldNoIndex = noIndex || pageConfig.noIndex;

  useEffect(() => {
    // Update document title
    document.title = finalTitle;

    // Helper to update or create meta tag
    const updateMeta = (name: string, content: string, property = false) => {
      const attr = property ? 'property' : 'name';
      let element = document.querySelector(`meta[${attr}="${name}"]`);
      if (!element) {
        element = document.createElement('meta');
        element.setAttribute(attr, name);
        document.head.appendChild(element);
      }
      element.setAttribute('content', content);
    };

    // Helper to update or create link tag
    const updateLink = (rel: string, href: string, hreflang?: string) => {
      const selector = hreflang 
        ? `link[rel="${rel}"][hreflang="${hreflang}"]`
        : `link[rel="${rel}"]:not([hreflang])`;
      let element = document.querySelector(selector);
      if (!element) {
        element = document.createElement('link');
        element.setAttribute('rel', rel);
        if (hreflang) element.setAttribute('hreflang', hreflang);
        document.head.appendChild(element);
      }
      element.setAttribute('href', href);
    };

    // Basic meta tags
    updateMeta('description', finalDescription);
    updateMeta('keywords', finalKeywords);
    updateMeta('author', author);

    // Robots
    if (shouldNoIndex) {
      updateMeta('robots', 'noindex, nofollow');
    } else {
      updateMeta('robots', 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1');
    }

    // Open Graph
    updateMeta('og:title', finalTitle, true);
    updateMeta('og:description', finalDescription, true);
    updateMeta('og:type', type, true);
    updateMeta('og:url', `${BASE_URL}${currentPath}`, true);
    updateMeta('og:image', image, true);
    updateMeta('og:site_name', 'E-SEOMAX', true);
    updateMeta('og:locale', lang === 'ar' ? 'ar_MA' : lang === 'fr' ? 'fr_MA' : 'en_US', true);
    updateMeta('og:locale:alternate', 'en_US', true);
    updateMeta('og:locale:alternate', 'fr_MA', true);
    updateMeta('og:locale:alternate', 'ar_MA', true);

    // Twitter Card
    updateMeta('twitter:card', 'summary_large_image');
    updateMeta('twitter:site', '@eseomax');
    updateMeta('twitter:creator', '@eseomax');
    updateMeta('twitter:title', finalTitle);
    updateMeta('twitter:description', finalDescription);
    updateMeta('twitter:image', image);

    // Article specific
    if (type === 'article') {
      if (publishedTime) updateMeta('article:published_time', publishedTime, true);
      if (modifiedTime) updateMeta('article:modified_time', modifiedTime, true);
      updateMeta('article:author', author, true);
      if (category) updateMeta('article:section', category, true);
    }

    // Canonical URL
    updateLink('canonical', `${BASE_URL}${currentPath}`);

    // Hreflang tags for multilingual SEO
    const cleanPath = currentPath === '/' ? '' : currentPath;
    updateLink('alternate', `${BASE_URL}${cleanPath}`, 'en');
    updateLink('alternate', `${BASE_URL}${cleanPath}`, 'fr');
    updateLink('alternate', `${BASE_URL}${cleanPath}`, 'ar');
    updateLink('alternate', `${BASE_URL}${cleanPath}`, 'x-default');

    // Geo targeting for Morocco
    updateMeta('geo.region', 'MA');
    updateMeta('geo.placename', 'Morocco');

    return () => {
      // Cleanup is optional as tags will be updated on next render
    };
  }, [finalTitle, finalDescription, finalKeywords, image, type, currentPath, lang, shouldNoIndex, author, publishedTime, modifiedTime, category]);

  return null;
};

export default SEO;

// Export Morocco cities for other components
export { moroccanCities };

// Export for use in blog posts
export const getBlogPostSEO = (post: {
  title: string;
  excerpt: string;
  slug: string;
  category?: string;
  featured_image?: string;
  published_at?: string;
  updated_at?: string;
}) => ({
  title: `${post.title} | E-SEOMAX Blog Morocco`,
  description: post.excerpt || `Immerse yourself deeply in the authoritative E-SEOMAX blog post titled '${post.title}'. Discover an incredibly comprehensive array of enterprise-level SEO insights, highly advanced technical optimization strategies, and extraordinarily effective digital marketing tactics explicitly tailored for businesses operating in Casablanca, Rabat, Marrakech, Tangier, Agadir, and across the dynamic Moroccan landscape. Our immensely dedicated team of world-class SEO experts thoroughly dissects complex search engine algorithms, providing phenomenally actionable recommendations to dramatically skyrocket your organic traffic, significantly elevate your Google rankings, and ruthlessly dominate your local and international competitors. Do not miss this utterly essential reading for any serious digital marketer or ambitious business owner determined to achieve unprecedented online success and phenomenal sustainable growth.`,
  image: post.featured_image || 'https://e-seomax.com/og-image.png',
  type: 'article' as const,
  publishedTime: post.published_at,
  modifiedTime: post.updated_at,
  category: post.category,
});

// Base Morocco keywords for blog posts
export const getMoroccoBaseKeywords = (lang: 'en' | 'fr' | 'ar' = 'en') => {
  const base = {
    en: 'SEO Morocco, SEO Casablanca, SEO Rabat, SEO Marrakech, free SEO audit Morocco, website optimization Morocco',
    fr: 'SEO Maroc, SEO Casablanca, SEO Rabat, SEO Marrakech, audit SEO gratuit Maroc, référencement Maroc',
    ar: 'SEO المغرب, SEO الدار البيضاء, SEO الرباط, SEO مراكش, تدقيق SEO مجاني, تحسين محركات البحث المغرب',
  };
  return base[lang];
};
