import { cn } from '@/utils/cn'
import type { ChangeEvent, FormEvent } from 'react'
import { useState } from 'react'

function SearchForm({
  className,
  onSubmit,
  submitText = 'Submit',
}: {
  className?: string
  onSubmit: (searchInput: string) => Promise<any>
  submitText?: string
}) {
  const [searchInput, setSearchInput] = useState('')
  const [errorMsg, setErrorMsg] = useState(false)
  const [backendData, setBackendData] = useState([{}])

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const result = await onSubmit(searchInput)
    console.log(result)
    console.log(searchInput)
    try {
      fetch('http://localhost:8000/api?query=' + searchInput, {
      }).then((response) => response.json())
        .then((data) => {
          console.log(typeof (data))
          setBackendData(data['countries'])
          setErrorMsg(false)
        })
        .catch(error => console.error(error));
    } catch (error) {
      setErrorMsg(true)
      console.error('Search Error : ', error)
    }
    setSearchInput('')
  }

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    setSearchInput(event.target.value)
  }

  return (
    <div>


      <form
        onSubmit={handleSubmit}
        className={cn('search-form is-revealing flex flex-col gap-2 sm:flex-row', className)}
      >
        <div className="mr-2 flex-shrink flex-grow">
          <label className="hidden" htmlFor="searchInput" aria-hidden="true">
          </label>
          <input
            required
            placeholder="Enter country name&hellip;"
            id="searchInput"
            name="searchInput"
            value={searchInput}
            onChange={handleChange}
            autoComplete="off"
            className="w-full rounded-sm border border-gray-300 bg-white px-4 py-3 text-sm text-gray-500 shadow-none"
          />
          {errorMsg ? (
            <div className="mt-2 text-xs italic text-gray-500 ">Result Not Found</div>
          ) : <div className="hidden"></div>}
        </div>

        <div className="control">
          <button
            className="-mt-px inline-flex cursor-pointer justify-center whitespace-nowrap 
          rounded-sm border-0 bg-gradient-to-r from-primary-500 to-primary-300 px-7 py-4 text-center font-medium leading-4 text-white no-underline shadow-lg"
            type="submit"
          >
            {submitText}
          </button>
        </div>
      </form>

      <div className="m-20">
        {backendData.map((backendData) => <div>{backendData[1]} {backendData[2]}</div>)}
      </div>
    </div>
  )
}

export default SearchForm
