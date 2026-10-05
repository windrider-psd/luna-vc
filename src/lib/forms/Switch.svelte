<script lang="ts">
    interface Props {
        label?: string
        design?: string
        options?: string[]
        fontSize?: number
        value?: boolean
        locked?: boolean
        id?:string
        onchange?: (value: boolean) => any;
    }

    let {
        label = "",
        design = "inner",
        options = [],
        fontSize = 16,
        value = $bindable(false),
        locked = false,
        id = String(Math.floor(Math.random() * 100)),
        onchange
    }: Props = $props()

    

    function handleClick(event: MouseEvent) {
        if (locked) {
            event.preventDefault()
            return
        }
        value = !value
        onchange?.(value)
    }
</script>

{#if design == "inner"}
    <div class="s s--inner">
        <span>{label} waa</span>
        <button type="button" role="switch" aria-checked={value} onclick={handleClick}  {id}>
            <span>on</span>
            <span>off</span>
        </button>
    </div>
{:else if design == "slider"}
    <div class="s s--slider" style="font-size:{fontSize}px">
        <span id="label-{id}">{label}</span>
        <button type="button" role="switch" aria-checked={value} aria-labelledby="label-{id}" onclick={handleClick} {id}>
        </button>
    </div>
{:else}
    <div class="s s--multi">
        <div
            role="radiogroup"
            class="group-container"
            aria-labelledby={`label-${id}`}
            style="font-size:{fontSize}px"
            id={`group-${id}`}
        >
            <div class="legend" id={`label-${id}`}>{label}</div>
            {#each options as option}
                <input type="radio" id={`${option}-${id}`} value={option} bind:group={value} />
                <label for={`${option}-${id}`}>
                    {option}
                </label>
            {/each}
        </div>
    </div>
{/if}
