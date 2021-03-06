import React, { useState } from 'react';

interface List {
  name: string
  items: Item[]
}

interface Item {
  name: string
  checked: boolean
}

function App() {
  const [checked, setChecked] = useState<boolean>(false)
  const [activeTab, setActiveTab] = useState<string>("drinks")
  const [newListTitle, setNewListTitle] = useState<string>("new list")
  const [newItemValue, setNewItemValue] = useState<string>("")
  const [state, setState] = useState<List[]>([
    {
      name: "drinks",
      items: [
        { name: "coffee", checked: false },
        { name: "coke", checked: false },
      ]
    },
    {
      name: "food",
      items: [
        { name: "bread", checked: false },
        { name: "cookies", checked: false }
      ],
    },
  ])

  const addListToState = () => {
    let newState = state.map((el) => { return el })
    newState.push({ name: newListTitle, items: [] })
    setState(newState)
  }


  const addItemToList = () => {

    let newLists = state.map((el) => {

      // Make a copy of items
      const newItems = el.items.map(item => {

        return item
      })

      // Need to check IF is in the right list, and only apply then
      if (activeTab === el.name) {
        // Push new item into the copied array
        newItems.push({ name: newItemValue, checked: false })
      }

      // Build and return new list
      return {
        name: el.name,
        items: newItems,
      }
    })
    setState(newLists)
  }



  const deleteFromList = (listToDeleteFrom: string, itemToDelete: string) => {
    // Iterate over every list in the state
    let newState = state.map(el => {

      // Return the same list if its not the listToDeleteFrom
      if (el.name !== listToDeleteFrom) {
        return el
      }

      // Iterate over every item in the list we want to delete from
      const newItems = el.items.filter(item => {
        // Do not return the item if the name matches itemToDelete
        if (item.name === itemToDelete) {
          return false
        }
        // Return the item
        return true
      })

      // Build new list
      return {
        name: el.name,
        items: newItems,
      }
    })

    // Set updated lists
    setState(newState)
  }



  const activeList = state.find((el) => {
    return el.name === activeTab
  })

  if (!activeList) {
    return <div>List not found</div>
  }

  return (

    <h1 className="App">

      <Header activeTab={activeTab} />

      <AddList
        setNewListTitle={setNewListTitle}
        newListTitle={newListTitle}
        addListToState={addListToState}
      />

      <SelectList
        state={state}
        setActiveTab={setActiveTab}
      />

      <AddItem
        setNewItemValue={setNewItemValue}
        newItemValue={newItemValue}
        addItemToList={addItemToList}
      />

      {activeList.items.map((el) => {

        return (
          <>
            <ShoppingItem
              name={el.name}
              isChecked={el.checked}
              deleteFromList={() => { deleteFromList(activeList.name, el.name) }}
              setChecked={() => { setChecked(el.checked = !checked) }}
            />
            <br />
          </>
        )
      })}
    </h1>
  );
}

interface HeaderProps {
  activeTab: string
}

const Header = ({ activeTab }: HeaderProps) => {
  return <>NINJA SHOPPING LIST - ACTIVE TAB: { activeTab} <br /></>
}

interface AddListProps {
  setNewListTitle: (value: string) => void
  newListTitle: string
  addListToState: () => void
}

const AddList = (props: AddListProps) => {
  const {
    setNewListTitle,
    newListTitle,
    addListToState
  } = props
  return (
    <>
      <input onChange={(e) => {
        setNewListTitle(e.currentTarget.value)
      }} value={newListTitle}></input>
      <button onClick={() => { addListToState() }}>+</button>
      <br />
    </>
  )
}

interface SelectListProps {
  state: List[]
  setActiveTab: (tab: string) => void
}

const SelectList = (props: SelectListProps) => {
  const {
    state,
    setActiveTab
  } = props

  return (
    <>
      {state.map(el => {
        return <button onClick={() => {
          setActiveTab(el.name)
        }}>{el.name}</button>
      })}
      <br /><br />
    </>
  )
}

interface AddItemProps {
  setNewItemValue: (value: string) => void
  newItemValue: string
  addItemToList: () => void
}

const AddItem = (props: AddItemProps) => {
  const {
    setNewItemValue,
    newItemValue,
    addItemToList
  } = props

  return (
    <>
      <input onChange={(e) => {
        setNewItemValue(e.currentTarget.value)
      }} value={newItemValue}></input>
      <button onClick={() => { addItemToList() }}>+</button>
      <br />
    </>
  )
}

interface ShoppingItemProps {
  name: string
  isChecked: boolean
  deleteFromList: () => void
  setChecked: (check: boolean) => void
}

const ShoppingItem = (props: ShoppingItemProps) => {
  // Destructuring fields from the props
  const {
    name,
    isChecked,
    deleteFromList,
    setChecked,
  } = props

  return (
    <span>

      <input type="checkbox"
        checked={isChecked}
        onChange={() => { setChecked(!isChecked) }}
      />

      {name}: {isChecked.toString()}
      <button onClick={() => {
        // Function closure declared in parent component
        deleteFromList()
      }}>Delete</button>
    </span>
  )
}

export default App;