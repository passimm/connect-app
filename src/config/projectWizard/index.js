import _ from 'lodash'
import typeToSpecification from '../projectSpecification/typeToSpecification'

const products = {
  Design: {
    icon: 'product-app-visual-design',
    info: 'Wireframe, mockups, visual design, and more',
    question: 'What kind of design do you need?',
    id: 'visual_design',
    subtypes: {
      Wireframes: {
        brief: '10-15 screens',
        details: 'Plan and explore the navigation and structure of your app',
        icon: 'product-wireframes',
        id: 'wireframes'
      },
      'App Visual Design - Concepts': {
        brief: '1-15 screens',
        details: 'Visualize and test your app requirements and ideas',
        icon: 'product-app-visual-design',
        id: 'visual_design_concepts',
        disabled: true
      },
      'Visual Design': {
        brief: '1-15 screens',
        details: 'Create development-ready designs',
        icon: 'product-app-visual-design',
        id: 'visual_design_prod'
      },
      Infographic: {
        brief: 'Infographic',
        details: 'Present your data in an easy-to-understand and interesting way',
        icon: 'product-infographic',
        id: 'infographic',
        disabled: true
      },
      'Other Design': {
        brief: 'other designs',
        details: 'Get help with other types of design',
        icon: 'product-other-design',
        id: 'generic_design'
      }
    }
  },
  Development: {
    icon: 'product-software-development',
    info: 'Front end prototypes, website and application development, services, and more',
    question: 'What do you need to develop?',
    id: 'app_dev',
    subtypes: {
      'Front-end Prototype': {
        brief: '3-20 screens',
        details: 'Translate designs to a web (HTML/CSS/JavaScript) or mobile prototype',
        icon: 'product-front-end-prototype',
        id: 'visual_prototype'
      },
      'Software Development': {
        brief: 'Tasks or adhoc',
        details: 'Get help with any part of your development cycle',
        icon: 'product-software-development',
        id: 'generic_dev'
      },
      'API': {
        brief: '',
        details: 'Build an API for your software',
        icon: 'product-software-development',
        id: 'api_dev'
      },
      'Integration': {
        brief: 'Tasks or adhoc',
        details: 'Expand and improve your software',
        icon: 'product-software-development',
        id: 'integration_dev'
      }
    }
  },
  App: {
    icon: 'project-app',
    info: 'Front end prototypes, website and application development, services, and more',
    question: 'What do you need to develop?',
    id: 'app',
    subtypes: {
      App: {
        brief: 'Apps',
        details: 'Build apps for mobile, web, or wearables',
        icon: 'product-app',
        id: 'application_development'
      },
    }
  },
  Website: {
    icon: 'project-website',
    info: 'Front end prototypes, website and application development, services, and more',
    question: 'What do you need to develop?',
    id: 'website',
    subtypes: {
      Website: {
        brief: 'Websites',
        details: 'Build responsive or regular websites',
        icon: 'product-website',
        id: 'website_development'
      },
    }
  },
  Chatbot: {
    icon: 'project-chatbot',
    info: 'Front end prototypes, website and application development, services, and more',
    question: 'What do you need to develop?',
    id: 'chatbot',
    subtypes: {
      'Watson Chatbot': {
        brief: 'Watson Chatbot',
        details: 'Build Chatbot using IBM Watson',
        icon: 'product-watson-chatbot',
        id: 'watson_chatbot'
      }
    }
  },
  QA: {
    icon: 'project-quality-assurance',
    info: 'Test and fix bugs in your software',
    question: 'What do you need to test?',
    id: 'quality_assurance',
    subtypes: {
      'Crowd Testing': {
        brief: 'TBD',
        details: 'Exploratory Testing, Cross browser-device Testing',
        icon: 'icon-crowd-testing',
        id: 'crowd_testing'
      },
      'Mobility Testing': {
        brief: 'TBD',
        details: 'App Certification, Lab on Hire, User Sentiment Analysis',
        icon: 'icon-mobility-testing',
        id: 'mobility_testing'
      },
      'Website Performance': {
        brief: 'TBD',
        details: 'Webpage rendering effiency, Load, Stress and Endurance Test',
        icon: 'icon-website-performance',
        id: 'website_performance'
      },
      'Digital Accessability': {
        brief: 'TBD',
        details: 'Make sure you app or website conforms to all rules and regulations',
        icon: 'icon-digital-accessability',
        id: 'digital_accessability'
      },
      'Open Source Automation': {
        brief: 'TBD',
        details: 'Exploratory testing, cross browser testing',
        icon: 'icon-os-automation',
        id: 'open_source_automation'
      },
      'Consulting & Adivisory': {
        brief: 'TBD',
        details: 'Expert services to get your project covered end-to-end',
        icon: 'icon-consulting-advisory',
        id: 'consulting_adivisory'
      }
    }
  }
}

export default products

export function findProduct(product) {
  if (product === 'generic_dev') {
    return 'Development'
  }
  if (product === 'generic_design') {
    return 'Design'
  }
  for(const pType in products) {
    for(const prd in products[pType].subtypes) {
      if (products[pType].subtypes[prd].id === product) {
        return prd
      }
    }
  }
}

export function findProductsOfCategory(category) {
  for(const pType in products) {
    if (products[pType].id === category) {
      const ret = []
      for(const prd in products[pType].subtypes) {
        ret.push({ ...products[pType].subtypes[prd], name: prd })
      }
      return ret
    }
  }
}

export function findProductCategory(product) {
  if (product === 'generic_dev') {
    return 'Development'
  }
  if (product === 'generic_design') {
    return 'Design'
  }
  for(const pType in products) {
    for(const prd in products[pType].subtypes) {
      const subType = products[pType].subtypes[prd]
      if (subType.id === product && !subType.disabled) {
        return pType
      }
    }
  }
}

/**
 * Finds field from the project creation template
 *
 * @param {string} product      id of the product. It should resolve to a template where search is to be made.
 * @param {string} sectionId    id of the section in the product template
 * @param {string} subSectionId id of the sub section under the section identified by sectionId
 * @param {string} fieldName    name of the field to be fetched
 *
 * @return {object} field from the template, if found, null otherwise
 */
export function getProjectCreationTemplateField(product, sectionId, subSectionId, fieldName) {
  let specification = 'topcoder.v1'
  if (product)
    specification = typeToSpecification[product]
  const sections = require(`../projectQuestions/${specification}`).basicSections
  const section = _.find(sections, {id: sectionId})
  let subSection = null
  if (subSectionId && section) {
    subSection = _.find(section.subSections, {id : subSectionId })
  }
  if (subSection) {
    if (subSectionId === 'questions') {
      return _.find(subSection.questions, { fieldName })
    }
    return subSection.fieldName === fieldName ? subSection : null
  }
  return null
}
