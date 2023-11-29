interface IMetaInfo {
  title: string;
  description: string;
}

export const metaInfo = {
  home: {
    title: 'Your Trusted Canada Immigration Consultants | RootOn',
    description:
      'Embark on your Canadian journey with us, a licensed Canada immigration agency . We will guide you through the intricacies of Canadian immigration.',
  },
  contactUs: {
    title: 'Canada Immigration Consultant in Montreal | RootOn',
    description:
      'Contact Root On, the best Canada Immigration Consultants in Montreal for any queries regarding Canadian visa, Canadian PR, Work Permits, Express Entry, etc.',
  },
  aboutUs: {
    title: 'About Us | RootOn',
    description:
      'We are a Regulated Canadian Immigration Consultant (RCIC) and CICC member with more than a decade of extensive experience in immigration and PR Process.',
  },
  blogs: {
    title: 'Canada Immigration | Latest News and Blogs | RootOn',
    description:
      'Everything you need to stay updated on the latest Canada and immigration news is here. Check the opportunities and culture in Canada through our blogs.',
  },
} satisfies Record<string, IMetaInfo>;
