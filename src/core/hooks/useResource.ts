import React, { useContext } from 'react';
import Axios from "axios";

import { AuthContext } from 'src';

export const useResource = () => {
  const { currentMerchant, token, baseApiUrl } = useContext(AuthContext);

  return {
    async fetchResource(schema: string, params: any, query: any) {
      try {
        const headers = {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
          'CurrentMerchantSlug': `${currentMerchant?.data?.slug || '-'}`
        }

        const path = query ? `${schema}${query}` : `${schema}`

        const result = await Axios.get(`${baseApiUrl}/${path}`, {
          headers: headers,
          params
        })

        return result
      } catch (error) {
        console.log(error)
      }
    },
    async fetchResourceWithId(schema: any, id: any, params: any) {
      try {
        const headers = {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
          'CurrentMerchantSlug': `${currentMerchant?.data?.slug || '-'}`
        }

        const result = await Axios.get(`${baseApiUrl}/${schema}/${id}`, {
          headers: headers,
          params
        })

        return result
      } catch (error) {
        console.log(error)
      }
    },
    async fetchResourceWithIdAndAction(schema: any, id: any, action: any, params: any) {
      try {
        const headers = {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
          'CurrentMerchantSlug': `${currentMerchant?.data?.slug || '-'}`
        }

        const result = await Axios.get(`${baseApiUrl}/${schema}/${id}/${action}`, {
          headers: headers,
          params
        })

        return result
      } catch (error) {
        console.log(error)
      }
    },
    async createResource(schema: any, body: any) {
      const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
        'CurrentMerchantSlug': `${currentMerchant?.data?.slug || '-'}`
      }

      const result = await Axios.post(`${baseApiUrl}/${schema}`, body, {
        headers: headers
      })

      return result
    },
    async createResourceWithSubSchema(schema: any, subSchema: any, body: any) {
      const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
        'CurrentMerchantSlug': `${currentMerchant?.data?.slug || '-'}`
      }

      const result = await Axios.post(`${baseApiUrl}/${schema}/${subSchema}`, body, {
        headers: headers
      })

      return result
    },
    async createResourceWithFormData(schema: any, fd: any) {
      const headers = {
        'Content-Type': 'multipart/form-data',
        'Authorization': `Bearer ${token}`,
        'CurrentMerchantSlug': `${currentMerchant?.data?.slug || '-'}`
      }

      const result = await Axios.post(`${baseApiUrl}/${schema}`, fd, {
        headers: headers
      })

      return result
    },
    async updateResourceWithFormDataWithoutId(schema: any, fd: any) {
      const headers = {
        'Content-Type': 'multipart/form-data',
        'Authorization': `Bearer ${token}`,
        'CurrentMerchantSlug': `${currentMerchant?.data?.slug || '-'}`
      }

      const result = await Axios.put(`${baseApiUrl}/${schema}`, fd, {
        headers: headers
      })

      return result
    },
    async updateResourceWithFormData(schema: any, id: any, fd: any) {
      const headers = {
        'Content-Type': 'multipart/form-data',
        'Authorization': `Bearer ${token}`,
        'CurrentMerchantSlug': `${currentMerchant?.data?.slug || '-'}`
      }

      const result = await Axios.put(`${baseApiUrl}/${schema}/${id}`, fd, {
        headers: headers
      })

      return result
    },
    async updateResource(schema: any, id: any, body: any) {
      const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
        'CurrentMerchantSlug': `${currentMerchant?.data?.slug || '-'}`
      }

      const result = await Axios.put(`${baseApiUrl}/${schema}/${id}`, body, {
        headers: headers
      })

      return result
    },
    async updateResourceWithoutId(schema: any, body: any) {
      const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
        'CurrentMerchantSlug': `${currentMerchant?.data?.slug || '-'}`
      }

      const result = await Axios.put(`${baseApiUrl}/${schema}`, body, {
        headers: headers
      })

      return result
    },
    async updateResourceWithFormDataWithAction(schema: any, id: any, action: any, fd: any) {
      const headers = {
        'Content-Type': 'multipart/form-data',
        'Authorization': `Bearer ${token}`,
        'CurrentMerchantSlug': `${currentMerchant?.data?.slug || '-'}`
      }

      const result = await Axios.put(`${baseApiUrl}/${schema}/${id}/${action}`, fd, {
        headers: headers
      })

      return result
    },
    async updateResourceWithAction(schema: any, id: any, action: any, body: any) {
      const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
        'CurrentMerchantSlug': `${currentMerchant?.data?.slug || '-'}`
      }

      const result = await Axios.put(`${baseApiUrl}/${schema}/${id}/${action}`, body, {
        headers: headers
      })

      return result
    },
    async deleteResource(schema: any, id: any) {
      const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
        'CurrentMerchantSlug': `${currentMerchant?.data?.slug || '-'}`
      }

      const result = await Axios.delete(`${baseApiUrl}/${schema}/${id}`, {
        headers: headers
      })

      return result
    },
    async restoreResource(schema: any, id: any, body: any) {
      const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
        'CurrentMerchantSlug': `${currentMerchant?.data?.slug || '-'}`
      }

      const result = await Axios.put(`${baseApiUrl}/${schema}/${id}/restore`, body, {
        headers: headers
      })

      return result
    },
    async destroyResource(schema: any, id: any) {
      const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
        'CurrentMerchantSlug': `${currentMerchant?.data?.slug || '-'}`
      }

      const result = await Axios.delete(`${baseApiUrl}/${schema}/${id}/destroy`, {
        headers: headers
      })

      return result
    },
  }
}
