import React from 'react';
import Button from '@mui/material/Button';
import { useForm } from 'react-hook-form';
import { Card } from 'flowbite-react';
import axios from 'axios';
import {
  useQuery,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query';


const Test = () => {
  const { register, handleSubmit, reset } = useForm();
  const queryClient = useQueryClient();

  const fetchCareData = async () => {
    const res = await axios.get('https://fitness-server-web.vercel.app/care');
    return res.data;
  };

  const { data: careData = [], isLoading } = useQuery({
    queryKey: ['care'],
    queryFn: fetchCareData,
  });

  const mutation = useMutation({
    mutationFn: async (formData) => {
      const res = await axios.post('https://fitness-server-web.vercel.app/care', formData);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['care'] });
      reset(); // clear form after successful submit
    },
  });

  const onSubmit = (data) => {
    mutation.mutate(data);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="grid grid-cols-1 gap-4 mb-10"
      >
        <input
          {...register('photo')}
          placeholder="Photo URL"
          className="p-2 border rounded"
        />
        <input
          {...register('name')}
          placeholder="Name"
          className="p-2 border rounded"
        />
        <input
          {...register('email')}
          placeholder="Email"
          className="p-2 border rounded"
        />
        <button
          type="submit"
          className="bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          Submit
        </button>
      </form>

      {isLoading ? (
        <p className="text-center">Loading...</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {careData.map((item) => (
            <Card key={item._id}>
              <img
                src={item.photo}
                alt={item.name}
                className="w-full h-48 object-cover rounded"
              />
              <div className='bg-gray-400'>
              <h5 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">
                {item.name}
              </h5>
             <p className="font-normal text-gray-700 dark:text-gray-400">
                {item.email}
              </p>
              </div>
              <Button variant="contained" color="primary">Click Me</Button>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default Test;
