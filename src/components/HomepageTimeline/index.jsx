import React from "react";

const HomepageTimeline = () => {
  return (
    <div class="bg-amber-50 mx-auto my-10 max-w-7xl space-y-8 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-slate-300 before:to-transparent">
      <div class="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
        <div class="flex items-center justify-center w-5 h-5 rounded-full border border-white bg-slate-300 group-[.is-active]:bg-indigo-500 text-slate-500 group-[.is-active]:text-emerald-50 shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2" />
        <div class="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] bg-white p-4 rounded border border-slate-200 shadow">
          <div class="flex items-center justify-between space-x-2 mb-1 text-xl">
            <div class="font-bold text-slate-900">Joute</div>
            <time class="font-caveat font-medium text-indigo-500">2021</time>
          </div>
          <video
            className="max-w-md mx-auto my-4 opacity-95 rounded-xl"
            muted
            controls
          >
            <source
              src="https://video.wixstatic.com/video/695feb_cb7b0a9043fc4bd3a5bccdc861e12c4b/1080p/mp4/file.mp4"
              type="video/mp4"
            />
          </video>
        </div>
      </div>

      <div class="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
        <div class="flex items-center justify-center w-10 h-10 rounded-full border border-white bg-slate-300 group-[.is-active]:bg-emerald-500 text-slate-500 group-[.is-active]:text-emerald-50 shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2">
          <svg
            class="fill-current"
            xmlns="http://www.w3.org/2000/svg"
            width="12"
            height="10"
          >
            <path
              fill-rule="nonzero"
              d="M10.422 1.257 4.655 7.025 2.553 4.923A.916.916 0 0 0 1.257 6.22l2.75 2.75a.916.916 0 0 0 1.296 0l6.415-6.416a.916.916 0 0 0-1.296-1.296Z"
            />
          </svg>
        </div>
        <div class="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] bg-white p-4 rounded border border-slate-200 shadow">
          <div class="flex items-center justify-between space-x-2 mb-1">
            <div class="font-bold text-slate-900">Order Shipped</div>
            <time class="font-caveat font-medium text-indigo-500">
              09/06/2023
            </time>
          </div>
          <div class="text-slate-500">
            Pretium lectus quam id leo. Urna et pharetra aliquam vestibulum
            morbi blandit cursus risus.
          </div>
        </div>
      </div>

      <div class="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
        <div class="flex items-center justify-center w-10 h-10 rounded-full border border-white bg-slate-300 group-[.is-active]:bg-emerald-500 text-slate-500 group-[.is-active]:text-emerald-50 shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2">
          <svg
            class="fill-current"
            xmlns="http://www.w3.org/2000/svg"
            width="12"
            height="10"
          >
            <path
              fill-rule="nonzero"
              d="M10.422 1.257 4.655 7.025 2.553 4.923A.916.916 0 0 0 1.257 6.22l2.75 2.75a.916.916 0 0 0 1.296 0l6.415-6.416a.916.916 0 0 0-1.296-1.296Z"
            />
          </svg>
        </div>

        <div class="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] bg-white p-4 rounded border border-slate-200 shadow">
          <div class="flex items-center justify-between space-x-2 mb-1">
            <div class="font-bold text-slate-900">In Transit</div>
            <time class="font-caveat font-medium text-indigo-500">
              10/06/2023
            </time>
          </div>
          <div class="text-slate-500">
            Pretium lectus quam id leo. Urna et pharetra aliquam vestibulum
            morbi blandit cursus risus.
          </div>
        </div>
      </div>

      <div class="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
        <div class="flex items-center justify-center w-10 h-10 rounded-full border border-white bg-slate-300 group-[.is-active]:bg-emerald-500 text-slate-500 group-[.is-active]:text-emerald-50 shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2">
          <svg
            class="fill-current"
            xmlns="http://www.w3.org/2000/svg"
            width="12"
            height="10"
          >
            <path
              fill-rule="nonzero"
              d="M10.422 1.257 4.655 7.025 2.553 4.923A.916.916 0 0 0 1.257 6.22l2.75 2.75a.916.916 0 0 0 1.296 0l6.415-6.416a.916.916 0 0 0-1.296-1.296Z"
            />
          </svg>
        </div>

        <div class="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] bg-white p-4 rounded border border-slate-200 shadow">
          <div class="flex items-center justify-between space-x-2 mb-1">
            <div class="font-bold text-slate-900">Out of Delivery</div>
            <time class="font-caveat font-medium text-indigo-500">
              12/06/2023
            </time>
          </div>
          <div class="text-slate-500">
            Pretium lectus quam id leo. Urna et pharetra aliquam vestibulum
            morbi blandit cursus risus.
          </div>
        </div>
      </div>

      <div class="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group">
        <div class="flex items-center justify-center w-10 h-10 rounded-full border border-white bg-slate-300 group-[.is-active]:bg-emerald-500 text-slate-500 group-[.is-active]:text-emerald-50 shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2">
          <svg
            class="fill-current"
            xmlns="http://www.w3.org/2000/svg"
            width="12"
            height="12"
          >
            <path d="M12 10v2H7V8.496a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5V12H0V4.496a.5.5 0 0 1 .206-.4l5.5-4a.5.5 0 0 1 .588 0l5.5 4a.5.5 0 0 1 .206.4V10Z" />
          </svg>
        </div>

        <div class="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] bg-white p-4 rounded border border-slate-200 shadow">
          <div class="flex items-center justify-between space-x-2 mb-1">
            <div class="font-bold text-slate-900">Delivered</div>
            <time class="font-caveat font-medium text-amber-500">
              Exp. 12/08/2023
            </time>
          </div>
          <div class="text-slate-500">
            Pretium lectus quam id leo. Urna et pharetra aliquam vestibulum
            morbi blandit cursus risus.
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomepageTimeline;