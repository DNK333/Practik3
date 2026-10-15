// AI-GENERATED: ChatGPT
import { useEffect, useMemo, useState, type FormEvent } from 'react'

type Habit = {
  id: string
  title: string
  completed: boolean
}

type Filter = 'all' | 'active' | 'completed'

const STORAGE_KEY = 'ritm-habits'

const starterHabits: Habit[] = [
  { id: 'starter-water', title: 'Выпить 8 стаканов воды', completed: false },
  { id: 'starter-reading', title: 'Почитать 20 минут', completed: true },
  { id: 'starter-walk', title: 'Прогуляться на свежем воздухе', completed: false },
]

const filters: { id: Filter; label: string }[] = [
  { id: 'all', label: 'Все привычки' },
  { id: 'active', label: 'Активные' },
  { id: 'completed', label: 'Выполненные' },
]

function isHabitList(value: unknown): value is Habit[] {
  return (
    Array.isArray(value) &&
    value.every(
      (item) =>
        typeof item === 'object' &&
        item !== null &&
        'id' in item &&
        typeof item.id === 'string' &&
        'title' in item &&
        typeof item.title === 'string' &&
        'completed' in item &&
        typeof item.completed === 'boolean',
    )
  )
}

function getHabitLabel(count: number): string {
  const lastTwoDigits = count % 100
  const lastDigit = count % 10
  if (lastTwoDigits >= 11 && lastTwoDigits <= 14) return 'привычек'
  if (lastDigit === 1) return 'привычка'
  if (lastDigit >= 2 && lastDigit <= 4) return 'привычки'
  return 'привычек'
}

function loadHabits(): Habit[] {
  try {
    const saved = window.localStorage.getItem(STORAGE_KEY)
    if (saved === null) return starterHabits

    const parsed: unknown = JSON.parse(saved)
    if (isHabitList(parsed)) return parsed

    console.error('Не удалось загрузить привычки: сохранённые данные имеют неверный формат.')
  } catch (error) {
    console.error('Не удалось загрузить привычки из localStorage.', error)
  }

  return starterHabits
}

function App() {
  const [habits, setHabits] = useState<Habit[]>(loadHabits)
  const [filter, setFilter] = useState<Filter>('all')
  const [newHabit, setNewHabit] = useState('')

  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(habits))
    } catch (error) {
      console.error('Не удалось сохранить привычки в localStorage.', error)
    }
  }, [habits])

  const completedCount = habits.filter((habit) => habit.completed).length
  const activeCount = habits.length - completedCount
  const progress = habits.length === 0 ? 0 : Math.round((completedCount / habits.length) * 100)

  const visibleHabits = useMemo(
    () =>
      habits.filter((habit) => {
        if (filter === 'active') return !habit.completed
        if (filter === 'completed') return habit.completed
        return true
      }),
    [filter, habits],
  )

  function addHabit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const title = newHabit.trim()
    if (!title) return

    setHabits((current) => [{ id: crypto.randomUUID(), title, completed: false }, ...current])
    setNewHabit('')
  }

  function toggleHabit(id: string) {
    setHabits((current) =>
      current.map((habit) =>
        habit.id === id ? { ...habit, completed: !habit.completed } : habit,
      ),
    )
  }

  function deleteHabit(id: string) {
    setHabits((current) => current.filter((habit) => habit.id !== id))
  }

  const dateLabel = new Intl.DateTimeFormat('ru-RU', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
  }).format(new Date())

  return (
    <main className="app-shell">
      <aside className="sidebar">
        <a className="brand" href="#" aria-label="Ритм — на главную">
          <span className="brand-mark" aria-hidden="true">
            <svg viewBox="0 0 32 32" fill="none">
              <path d="M5 17h6l3-8 5 15 3-7h5" />
            </svg>
          </span>
          <span>ритм<span className="brand-dot">.</span></span>
        </a>

        <div className="sidebar-caption">РАБОЧЕЕ ПРОСТРАНСТВО</div>
        <nav className="side-nav" aria-label="Основная навигация">
          <a className="nav-item nav-item-active" href="#habits">
            <span className="nav-icon" aria-hidden="true">◷</span>
            Мои привычки
            <span className="nav-count">{habits.length}</span>
          </a>
          <a className="nav-item" href="#progress">
            <span className="nav-icon nav-icon-chart" aria-hidden="true">▥</span>
            Мой прогресс
          </a>
        </nav>

        <div className="sidebar-note">
          <span className="note-sparkle" aria-hidden="true">✳</span>
          <p className="note-title">Маленькие шаги — большие перемены</p>
          <p className="note-copy">Не стремись к идеалу. Просто возвращайся к своим привычкам каждый день.</p>
          <div className="note-decoration" aria-hidden="true">✳</div>
        </div>

        <div className="profile">
          <div className="avatar" aria-hidden="true">Д</div>
          <div className="profile-copy">
            <strong>Магамед Дзангиев</strong>
            <span>Мой личный трекер</span>
          </div>
          <span className="profile-menu" aria-hidden="true">•••</span>
        </div>
      </aside>

      <section className="main-content" id="habits">
        <header className="topbar">
          <div className="breadcrumb"><span>Моё пространство</span><span className="crumb-separator">/</span><strong>Привычки</strong></div>
          <div className="topbar-right">
            <span className="today-date">{dateLabel}</span>
            <span className="date-icon" aria-hidden="true">▦</span>
          </div>
        </header>

        <div className="content-wrap">
          <section className="welcome">
            <div>
              <p className="eyebrow">ТВОЙ ДЕНЬ, ТВОЙ РИТМ</p>
              <h1>Привет, Магамед <span aria-hidden="true">✦</span></h1>
              <p className="welcome-copy">Каждый день — новый шанс стать ближе к себе.</p>
            </div>
            <div className="welcome-art" aria-hidden="true">
              <div className="art-sun" />
              <div className="art-stem art-stem-one"><i /></div>
              <div className="art-stem art-stem-two"><i /></div>
              <div className="art-ground" />
            </div>
          </section>

          <section className="stats-grid" id="progress" aria-label="Статистика привычек">
            <article className="stat-card">
              <div className="stat-top"><span className="stat-label">Всего привычек</span><span className="stat-icon icon-violet">✳</span></div>
              <div className="stat-value">{habits.length}<span className="stat-unit"> {getHabitLabel(habits.length)}</span></div>
              <div className="stat-foot">Твой список на сегодня</div>
            </article>
            <article className="stat-card">
              <div className="stat-top"><span className="stat-label">Выполнено сегодня</span><span className="stat-icon icon-green">✓</span></div>
              <div className="stat-value">{completedCount}<span className="stat-unit"> из {habits.length}</span></div>
              <div className="stat-foot">{completedCount ? 'Отличное начало дня!' : 'Начни с первого шага'}</div>
            </article>
            <article className="stat-card progress-stat">
              <div className="stat-top"><span className="stat-label">Твой прогресс</span><span className="stat-icon icon-orange">↗</span></div>
              <div className="stat-value">{progress}<span className="stat-unit">%</span></div>
              <div className="progress-track" role="progressbar" aria-label="Прогресс за сегодня" aria-valuenow={progress} aria-valuemin={0} aria-valuemax={100}>
                <span style={{ width: `${progress}%` }} />
              </div>
            </article>
          </section>

          <section className="habits-section">
            <div className="section-heading">
              <div>
                <h2>Мои привычки <span className="heading-count">{habits.length}</span></h2>
                <p>Сосредоточься на том, что важно сегодня.</p>
              </div>
              <span className="active-summary"><span />Активных: {activeCount}</span>
            </div>

            <form className="add-form" onSubmit={addHabit}>
              <label className="sr-only" htmlFor="habit-title">Название новой привычки</label>
              <span className="input-plus" aria-hidden="true">＋</span>
              <input
                id="habit-title"
                type="text"
                value={newHabit}
                onChange={(event) => setNewHabit(event.target.value)}
                placeholder="Добавить новую привычку..."
                maxLength={80}
              />
              <button type="submit" disabled={!newHabit.trim()}>Добавить привычку <span aria-hidden="true">↗</span></button>
            </form>

            <div className="list-toolbar">
              <div className="filter-tabs" role="group" aria-label="Фильтр привычек">
                {filters.map((item) => (
                  <button
                    className={`filter-tab${filter === item.id ? ' filter-tab-active' : ''}`}
                    type="button"
                    key={item.id}
                    onClick={() => setFilter(item.id)}
                    aria-pressed={filter === item.id}
                  >
                    {item.label}
                    <span>{item.id === 'all' ? habits.length : item.id === 'active' ? activeCount : completedCount}</span>
                  </button>
                ))}
              </div>
              <span className="today-label"><span aria-hidden="true">◷</span> Сегодня</span>
            </div>

            <div className="habit-list">
              {visibleHabits.length > 0 ? visibleHabits.map((habit, index) => (
                <article className={`habit-card${habit.completed ? ' habit-card-complete' : ''}`} key={habit.id}>
                  <button
                    className="check-button"
                    type="button"
                    onClick={() => toggleHabit(habit.id)}
                    aria-label={habit.completed ? `Снять отметку: ${habit.title}` : `Отметить выполненной: ${habit.title}`}
                    aria-pressed={habit.completed}
                  >
                    {habit.completed && <span aria-hidden="true">✓</span>}
                  </button>
                  <span className={`habit-emoji habit-emoji-${index % 4}`} aria-hidden="true">
                    {['✿', '◉', '⌁', '✦'][index % 4]}
                  </span>
                  <div className="habit-copy">
                    <h3>{habit.title}</h3>
                    <p>{habit.completed ? 'Выполнено сегодня' : 'Ежедневная привычка'}</p>
                  </div>
                  <span className={`habit-status${habit.completed ? ' status-complete' : ''}`}>
                    <span />{habit.completed ? 'Выполнено' : 'В процессе'}
                  </span>
                  <button
                    className="delete-button"
                    type="button"
                    onClick={() => deleteHabit(habit.id)}
                    aria-label={`Удалить привычку: ${habit.title}`}
                    title="Удалить привычку"
                  >
                    <svg viewBox="0 0 20 20" aria-hidden="true">
                      <path d="M4.5 6h11M8 6V4.5h4V6m2.5 0-.6 9H6.1l-.6-9M8.3 8.5v4.2m3.4-4.2v4.2" />
                    </svg>
                  </button>
                </article>
              )) : (
                <div className="empty-state">
                  <span aria-hidden="true">{habits.length === 0 ? '✳' : '✓'}</span>
                  <h3>{habits.length === 0 ? 'Начни с одной привычки' : 'Здесь пока пусто'}</h3>
                  <p>{habits.length === 0 ? 'Добавь небольшое действие, которое хочешь повторять каждый день.' : 'Попробуй выбрать другой фильтр.'}</p>
                </div>
              )}
            </div>

            <footer className="list-footer">
              <span>Привычки сохраняются автоматически</span>
              <span className="saved-indicator"><i /> Сохранено</span>
            </footer>
          </section>

          <footer className="page-footer">С заботой о твоих маленьких шагах <span aria-hidden="true">♡</span></footer>
        </div>
      </section>
    </main>
  )
}

export default App
