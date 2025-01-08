import { Context } from '@/context/TokenContext';
import { instance } from '@/hook/intance';


import { ProductType } from '@/types/ProductType';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import Image from 'next/image';
import React, { useContext } from 'react';
import { toast } from 'react-toastify';
import {ShoppingCart,Heart   } from "lucide-react";


const ProductItem: React.FC<{ item: ProductType }> = ({ item }) => {
  const { token } = useContext(Context);
  const queryClient = useQueryClient();

  const basketMutation = useMutation({
    mutationFn: (data: { productId: string }) =>
      instance().post('/basket', data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
      queryClient.invalidateQueries({ queryKey: ['basketCount'] });
    },
  });



  const likeMutation = useMutation({

    mutationFn: (id: string) =>
      instance().post(`/like/${id}`, {}, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
    },
  });

  return (
    <li>

      <Image
        style={{ width: '250px', height: '250px' }}
        src={item.image_url ? item.image_url[0] : '/logo.svg'}
        alt="Product img"
        width={250}
        height={250}
        priority
      />
      <h3 className="text-[16px] font-normal my-3">{item.product_name}</h3>
      <div className="space-x-5">
        <strong>${item.discount}</strong>
        <strong>${item.cost ? item.cost : ''}</strong>
      </div>
      <div className="flex items-center gap-5 py-2 cursor-pointer">
        <button
         
          onClick={() =>
            token
              ? basketMutation.mutate({ productId: item.product_id })
              : toast.error("Logindan o'tish shart!")
          }
        >
           <ShoppingCart fill={item.basket ? "green" : "none"} color={item.basket ? "green" : "black"}/>
        </button>
        <button
          onClick={() => likeMutation.mutate(item.product_id)}
        >
          <Heart fill={item.liked ? "red" : "none"} color={item.liked ? "red" : "black"} />
         
        </button>
      </div>
    </li>
  );
};

export default ProductItem;
