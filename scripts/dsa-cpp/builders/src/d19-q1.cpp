#include <bits/stdc++.h>
using namespace std;

long long fib_term(long long n) {
    std::vector<long long> f(n + 1);
    f[0] = 0;
    if (n >= 1) f[1] = 1;
    for (long long i = 2; i <= n; i++) f[i] = f[i - 1] + f[i - 2];
    return f[n];
}

int main() {
    long long n;
    cin >> n;
    cout << fib_term(n) << "\n";
    return 0;
}
