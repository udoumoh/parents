import { gql } from "@apollo/client";

export const LOGIN_PARENT = gql(`
mutation LoginParent($password: String!, $email: String!) {
  loginParent(password: $password, email: $email) {
    errors {
      field
      message
    }
    parent {
      id
      userId
      status
      isPaid
      isVerified
      isReferred
      agreedTo
      createdAt
      firstName
      middleName
      lastName
      parentRole
      phoneNumber
      email
      role
      folder
      isDisabled
      profileImgUrl
    }
  }
}`);

export const LOGOUT_PARENTS = gql(`
mutation Mutation {
  logoutParent
}
`);

export const REGISTER_PARENT = gql(`
mutation RegisterParent($folder: String!, $options: parentRegInput!) {
  registerParent(folder: $folder, options: $options) {
    errors {
      field
      message
    }
    parent {
      id
      userId
      status
      isPaid
      isVerified
      isReferred
      agreedTo
      createdAt
      firstName
      middleName
      lastName
      parentRole
      phoneNumber
      email
      role
      folder
      isDisabled
      profileImgUrl
      children {
        id
        createdAt
        transferedAt
        firstName
        middleName
        lastName
        gender
        ageInput
        folder
        isOwing
        isVisible
        isDuplicate
        linkedAt
        linkCount
        isLinked
        startDate
        endDate
        birthDate
        isArchived
        profileImgUrl
        classroom {
          classroom {
            id
            isValid
            wasEdited
            createdAt
            updatedAt
            classId
            className
            classSubjects
            description
            isDisabled
            students {
              id
              createdAt
              transferedAt
              firstName
              middleName
              lastName
              gender
              ageInput
              folder
              isOwing
              isVisible
              isDuplicate
              linkedAt
              linkCount
              isLinked
              startDate
              endDate
              birthDate
              isArchived
              profileImgUrl
              grayId
              fatherName
              fatherEmail
              fatherNumber
              motherName
              motherEmail
              motherNumber
              homeAddress
              lgaOrigin
              state
            }
            teacher {
              id
              userId
              createdAt
              status
              firstName
              middleName
              lastName
              phoneNumber
              email
              role
              folder
              isDisabled
              isVisible
              profileImgUrl
            }
          }
        }
        school {
          school {
            id
            createdAt
            isDisabled
            isVerified
            schoolName
            rcnumber
            address
            type
            lgarea
            folder
            state
            country
            description
            phonenumber
            email
            websiteUrl
            instagramUrl
            facebookUrl
            twitterUrl
            linkedinUrl
            logoImgUrl
            bannerImgUrl
            license
          }
        }
        creator {
          admin {
            id
            isPaid
            userId
            folder
            status
            plan
            isReferred
            isDisabled
            agreedTo
            referralCode
            createdAt
            firstName
            middleName
            lastName
            phoneNumber
            email
            profileImgUrl
            role
            school
            schoolImg
            statusCode
          }
        }
        studentCase {
          grayCase {
            id
            createdAt
            updatedAt
            category
            owingAmount
            note
            isActive
            wasEdited
          }
        }
        grayId
        fatherName
        fatherEmail
        fatherNumber
        motherName
        motherEmail
        motherNumber
        homeAddress
        lgaOrigin
        state
      }
    }
  }
}`);

export const DELETE_REQUEST = gql(`mutation DeleteRequest($deleteRequestId: Float!) {
  deleteRequest(id: $deleteRequestId)
}`)

export const RESET_PASSWORD_LINK = gql(`mutation ForgotParentPassword($email: String!) {
  forgotParentPassword(email: $email)
}`)

export const REMOVE_STUDENT = gql(`mutation GnRemoveStudent($studentId: Float!) {
  gnRemoveStudent(studentId: $studentId)
}`)

export const RECOVER_STUDENT = gql(`mutation GnRecoverStudent($studentId: Float!) {
  gnRecoverStudent(studentId: $studentId)
}`)

export const CHANGE_PARENT_PASSWORD = gql(`mutation ChangeParentPassword($newPassword: String!, $token: String!) {
  changeParentPassword(newPassword: $newPassword, token: $token) {
    errors {
      field
      message
    }
    parent {
      id
      userId
      status
      isPaid
      isVerified
      isReferred
      agreedTo
      createdAt
      firstName
      middleName
      lastName
      parentRole
      phoneNumber
      email
      role
      folder
      isDisabled
      profileImgUrl
      children {
        id
        createdAt
        transferedAt
        firstName
        middleName
        lastName
        gender
        ageInput
        folder
        isOwing
        isVisible
        isDuplicate
        linkedAt
        linkCount
        isLinked
        startDate
        endDate
        birthDate
        isArchived
        profileImgUrl
        classroom {
          classroom {
            id
            isValid
            wasEdited
            createdAt
            updatedAt
            classId
            className
            classSubjects
            description
            isDisabled
            students {
              id
              createdAt
              transferedAt
              firstName
              middleName
              lastName
              gender
              ageInput
              folder
              isOwing
              isVisible
              isDuplicate
              linkedAt
              linkCount
              isLinked
              startDate
              endDate
              birthDate
              isArchived
              profileImgUrl
              grayId
              fatherName
              fatherEmail
              fatherNumber
              motherName
              motherEmail
              motherNumber
              homeAddress
              lgaOrigin
              state
            }
            teacher {
              id
              userId
              createdAt
              status
              firstName
              middleName
              lastName
              phoneNumber
              email
              role
              folder
              isDisabled
              isVisible
              profileImgUrl
            }
          }
        }
        school {
          school {
            id
            createdAt
            isDisabled
            isVerified
            schoolName
            rcnumber
            address
            type
            lgarea
            folder
            state
            country
            description
            phonenumber
            email
            websiteUrl
            instagramUrl
            facebookUrl
            twitterUrl
            linkedinUrl
            accountName
            accountNumber
            bankName
            logoImgUrl
            bannerImgUrl
            license
          }
        }
        creator {
          admin {
            id
            isPaid
            userId
            folder
            status
            plan
            isReferred
            isDisabled
            agreedTo
            referralCode
            createdAt
            firstName
            middleName
            lastName
            phoneNumber
            email
            profileImgUrl
            role
            accountOfficer {
              id
              userId
              isDisabled
              isSuper
              isDirector
              createdAt
              fullName
              username
              phoneNumber
              role
              status
              department
              email
              profileImgUrl
              greyAdmin {
                id
                isPaid
                userId
                folder
                status
                plan
                isReferred
                isDisabled
                agreedTo
                referralCode
                createdAt
                firstName
                middleName
                lastName
                phoneNumber
                email
                profileImgUrl
                role
                school
                schoolImg
                statusCode
              }
            }
            school
            schoolImg
            statusCode
          }
        }
        studentCase {
          grayCase {
            id
            createdAt
            updatedAt
            category
            owingAmount
            note
            isActive
            wasEdited
          }
        }
        grayId
        fatherName
        fatherEmail
        fatherNumber
        motherName
        motherEmail
        motherNumber
        homeAddress
        lgaOrigin
        state
      }
    }
  }
}`)

export const LIKE_PROFILE = gql(`mutation LikeProfile($schoolId: Float!) {
  likeProfile(schoolId: $schoolId)
}`)

export const UNLIKE_PROFILE = gql(`mutation UnlikeProfile($schoolId: Float!) {
  unlikeProfile(schoolId: $schoolId)
}`)

export const PAY_WITH_BALANCE = gql(`mutation PayInvoiceWithBalance($invoiceId: Float!) {
  payInvoiceWithBalance(invoiceId: $invoiceId)
}`)

export const INITIATE_PARENT_SUBSCRIPTION = gql(`
  mutation InitiateParentSubscription($subDuration: String!, $subType: String!, $subAmount: Float!, $plan: String!, $code: String!) {
    initiateParentSubscription(subDuration: $subDuration, subType: $subType, subAmount: $subAmount, plan: $plan, code: $code)
  }`)