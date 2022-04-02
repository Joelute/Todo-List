<script>
  import { createEventDispatcher } from "svelte";
  import Calender from "$lib/Calendar.svelte";
  import { getMonthName } from "$lib/date-time.js";

  const dispatch = createEventDispatcher();

  // props
  export let selected = new Date();

  // state
  let date, month, year;
  let DatePicker;

  // so that these change with props
  $: {
    date = selected.getDate();
    month = selected.getMonth();
    year = selected.getFullYear();
  }

  // handlers
  const onFocus = () => {
    DatePicker.classList.remove("hide__datepicker")
  };

  const next = () => {
    if (month === 11) {
      month = 0;
      year = year + 1;
      return;
    }
    month = month + 1;
  };

  const prev = () => {
    if (month === 0) {
      month = 11;
      year -= 1;
      return;
    }
    month -= 1;
  };

  const onDateChange = d => {
    dispatch("datechange", d.detail);
    DatePicker.classList.add("hide__datepicker")
  };
</script>

<style>
  .date__box {
    display:flex;
    border: none;
    outline: none;
    text-align: center;
    border-radius: 12px;
    box-shadow: 0 0 3px 0 rgba(0, 0, 0, 0.5);
    padding: 1rem;
    margin: 0 auto 0 auto;
  }

  .box {
    border: none;
    position: absolute;
    display: block;
    background: var(--body-color);
    border-radius: 12px;
    box-shadow: 0 0 3px 0 rgba(0, 0, 0, 0.5);
    top: 9.3rem;
    width: 25rem;
    left:0;
    right:0;
    margin:auto;
    
  }

  .month-name {
    display: flex;
    justify-content: space-around;
    align-items: center;
    margin: 6px 0;
  }

  .nav__button{
    border-radius: 12px;
    padding: 5px;
    border: none;
    background-color: var(--body-color);
    box-shadow: 0 0 3px 0 rgba(0, 0, 0, 0.5);
  }

  .center {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .hide__datepicker{
    top: -300% !important;
  }
</style>


<input class = "date__box" type="text" on:focus={onFocus} value={selected.toDateString()} readonly/>
<div class="box hide__datepicker" bind:this={DatePicker}>
  <div class="month-name">
    <div class="center">
      <button class="nav__button"on:click={prev}>Prev</button>
    </div>
    <div class="center">{getMonthName(month)} {year}</div>
    <div class="center">
      <button class="nav__button" on:click={next}>Next</button>
    </div>
  </div>
  <Calender
    {month}
    {year}
    date={selected}
    on:datechange={onDateChange} />
</div>

