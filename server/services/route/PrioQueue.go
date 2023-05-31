package route

type PrioQueue []pathEntry

func (q *PrioQueue) Enqueue(p pathEntry) {
	(*q) = append((*q), p)

	for i := len(*q) - 2; i >= 0 && (*q)[i].Cost > p.Cost; i-- {
		temp := (*q)[i+1]
		(*q)[i+1] = (*q)[i]
		(*q)[i] = temp
	}
}

func (q *PrioQueue) Dequeue() (pathEntry, bool) {
	if len(*q) == 0 {
		return pathEntry{}, false
	}

	result := (*q)[0]
	(*q) = (*q)[1:]

	return result, true
}
